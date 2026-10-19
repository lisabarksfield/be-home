/**
 * Standalone furniture planning geometry, in metres (not the house model).
 * x/y are item centres; room/access coordinates originate at the top-left.
 * Room widths and polygons are source estimates from the supplied Basement plan,
 * not as-built verification. Workshop/treatment shapes approximate its outline;
 * reported areas are source labels, not an area recalculated from the outline.
 * Studio routes reproduce the conceptual 1 m left / 1.44 m rear clear strips.
 * Footprints omit moving parts, occupied clearance, door swings and code capacity.
 */
export const ROOMS = [
  { id: 'studio', name: 'Studio', width: 6.91, height: 10.04, area: 69.4,
    polygon: [[0, 0], [6.91, 0], [6.91, 10.04], [0, 10.04]],
    accessZones: [{ x: 0, y: 0, w: 1, d: 10.04 }, { x: 1, y: 8.6, w: 5.91, d: 1.44 }],
    fixedFeatures: [],
    description: 'Approximate 6.91 × 10.04 m rectangular studio. Keep the left and rear planning routes clear; verify dimensions and exits on site.' },
  { id: 'workshop', name: 'Workshop', width: 6.27, height: 8.075, area: 50.6,
    polygon: [[0, 0], [6.27, 0], [6.27, 8.075], [0, 8.075]],
    accessZones: [],
    fixedFeatures: [{ id: 'fixed-table', label: 'Fixed table, cannot be moved', x: 3.135, y: 2.8925, w: 2.51, d: 1.805 }],
    description: 'Approximate 6.27 × 8.075 m rectangular workshop, measured from the Workshop Floor Plan. The crafting table is fixed in place; build your layout around it and confirm dimensions and door clearance on site.' },
  { id: 'treatment', name: 'Treatment', width: 3.61, height: 3.83, area: 13.8,
    polygon: [[0, 0], [3.38, 0], [3.61, 1.03], [3.61, 3.83], [0, 3.83]],
    accessZones: [],
    fixedFeatures: [],
    description: 'Approximate treatment-room outline with an angled corner. Dimensions are source estimates; confirm the shape and door clearance on site.' }
];

export const CATALOG = [
  { kind: 'chair', label: 'Chair', w: .5, d: .55 },
  { kind: 'table', label: 'Table', w: 1.8, d: .8 },
  { kind: 'mat', label: 'Yoga mat', w: .61, d: 1.83 },
  { kind: 'instructor_mat', label: 'Instructor mat', w: .61, d: 1.83 },
  { kind: 'reformer', label: 'Pilates reformer', w: .8, d: 2.5 },
  { kind: 'poseur', label: 'Poseur table', w: .7, d: .7 },
  { kind: 'massage', label: 'Massage table', w: .75, d: 1.9 },
  { kind: 'sofa', label: 'Sofa', w: 1.8, d: .8 },
  { kind: 'person', label: 'Person marker', w: .44, d: .44 }
];

const EPS = 1e-8;
const roomFor = id => {
  const room = ROOMS.find(r => r.id === id);
  if (!room) throw new Error('Choose a known room.');
  return room;
};
const catalogFor = kind => {
  const entry = CATALOG.find(c => c.kind === kind);
  if (!entry) throw new Error('Choose a known furniture kind.');
  return entry;
};

export function makeItem(kind, id, x, y) {
  const entry = catalogFor(kind);
  return { id, kind, x, y, w: entry.w, d: entry.d, angle_deg: 0 };
}

/** Convex item outline. Poseur tables and people use a 16-sided ellipse. */
export function polygon(item) {
  const angle = (item.angle_deg || 0) * Math.PI / 180;
  const cos = Math.cos(angle), sin = Math.sin(angle);
  const local = item.kind === 'poseur' || item.kind === 'person'
    ? Array.from({ length: 16 }, (_, i) => {
      const a = i * Math.PI / 8;
      return [Math.cos(a) * item.w / 2, Math.sin(a) * item.d / 2];
    })
    : [[-item.w / 2, -item.d / 2], [item.w / 2, -item.d / 2], [item.w / 2, item.d / 2], [-item.w / 2, item.d / 2]];
  return local.map(([x, y]) => [item.x + x * cos - y * sin, item.y + x * sin + y * cos]);
}

const bounds = points => ({
  minX: Math.min(...points.map(p => p[0])), maxX: Math.max(...points.map(p => p[0])),
  minY: Math.min(...points.map(p => p[1])), maxY: Math.max(...points.map(p => p[1]))
});

/** Bounding-box clamp only. A notch/diagonal or blocked route still gets a warning. */
export function clampItem(item, roomId) {
  const room = roomFor(roomId), b = bounds(polygon({ ...item, x: 0, y: 0 }));
  const x = b.maxX - b.minX > room.width ? room.width / 2 : Math.max(-b.minX, Math.min(room.width - b.maxX, item.x));
  const y = b.maxY - b.minY > room.height ? room.height / 2 : Math.max(-b.minY, Math.min(room.height - b.maxY, item.y));
  return { ...item, x, y };
}

const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
const onSegment = (p, a, b) => Math.abs(cross(a, b, p)) <= EPS &&
  p[0] >= Math.min(a[0], b[0]) - EPS && p[0] <= Math.max(a[0], b[0]) + EPS &&
  p[1] >= Math.min(a[1], b[1]) - EPS && p[1] <= Math.max(a[1], b[1]) + EPS;

function pointInside(point, outline) {
  let inside = false;
  for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
    const a = outline[j], b = outline[i];
    if (onSegment(point, a, b)) return true;
    if ((a[1] > point[1]) !== (b[1] > point[1]) &&
        point[0] < (b[0] - a[0]) * (point[1] - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
  }
  return inside;
}

// Splitting each furniture edge at all room-boundary intersections detects an
// excursion through a concave notch even when every furniture vertex is inside.
function contained(points, outline) {
  if (!points.every(p => pointInside(p, outline))) return false;
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i + 1) % points.length];
    const dx = b[0] - a[0], dy = b[1] - a[1], ts = [0, 1];
    for (let j = 0; j < outline.length; j++) {
      const c = outline[j], d = outline[(j + 1) % outline.length];
      const ex = d[0] - c[0], ey = d[1] - c[1];
      const denominator = dx * ey - dy * ex;
      if (Math.abs(denominator) <= EPS) continue;
      const t = ((c[0] - a[0]) * ey - (c[1] - a[1]) * ex) / denominator;
      const u = ((c[0] - a[0]) * dy - (c[1] - a[1]) * dx) / denominator;
      if (t > 0 && t < 1 && u >= -EPS && u <= 1 + EPS) ts.push(t);
    }
    ts.sort((a, b) => a - b);
    for (let j = 1; j < ts.length; j++) {
      const t = (ts[j - 1] + ts[j]) / 2;
      if (!pointInside([a[0] + dx * t, a[1] + dy * t], outline)) return false;
    }
  }
  return true;
}

// Separating-axis test for convex furniture and access-zone polygons. A shared
// edge is not an overlap; the tolerance only absorbs floating-point roundoff.
function overlaps(a, b) {
  for (const points of [a, b]) {
    for (let i = 0; i < points.length; i++) {
      const p = points[i], q = points[(i + 1) % points.length];
      const length = Math.hypot(q[0] - p[0], q[1] - p[1]);
      const ax = -(q[1] - p[1]) / length, ay = (q[0] - p[0]) / length;
      const pa = a.map(p => p[0] * ax + p[1] * ay), pb = b.map(p => p[0] * ax + p[1] * ay);
      if (Math.max(...pa) <= Math.min(...pb) + EPS || Math.max(...pb) <= Math.min(...pa) + EPS) return false;
    }
  }
  return true;
}

const fixedPolygon = f => [[f.x - f.w / 2, f.y - f.d / 2], [f.x + f.w / 2, f.y - f.d / 2], [f.x + f.w / 2, f.y + f.d / 2], [f.x - f.w / 2, f.y + f.d / 2]];

export function placementIssues(items, roomId) {
  const room = roomFor(roomId), issues = [], footprints = items.map(polygon);
  const zones = room.accessZones.map(z => [[z.x, z.y], [z.x + z.w, z.y], [z.x + z.w, z.y + z.d], [z.x, z.y + z.d]]);
  const fixed = (room.fixedFeatures || []).map(fixedPolygon);
  items.forEach((item, i) => {
    if (!contained(footprints[i], room.polygon)) issues.push({ type: 'boundary', ids: [item.id], message: 'Footprint extends outside the approximate room outline.' });
    if (zones.some(z => overlaps(footprints[i], z))) issues.push({ type: 'access', ids: [item.id], message: 'Footprint occupies a marked clear route.' });
    if (fixed.some(f => overlaps(footprints[i], f))) issues.push({ type: 'fixed', ids: [item.id], message: 'Footprint overlaps a fixed feature that cannot be moved.' });
    for (let j = 0; j < i; j++) {
      if (overlaps(footprints[i], footprints[j])) issues.push({ type: 'overlap', ids: [items[j].id, item.id], message: 'Furniture footprints overlap.' });
    }
  });
  return issues;
}

/** Validate data before use. Labels stay plain data; the UI must use textContent. */
export function validateProject(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw) || raw.version !== 1) throw new Error('Expected a version 1 planner project.');
  const room = roomFor(raw.roomId);
  if (!Array.isArray(raw.items) || raw.items.length > 200) throw new Error('A project must contain at most 200 objects.');
  const ids = new Set();
  const items = raw.items.map(i => {
    if (!i || typeof i !== 'object' || Array.isArray(i)) throw new Error('Each object must be an item.');
    catalogFor(i.kind);
    if (typeof i.id !== 'string' || !/^[A-Za-z0-9_-]{1,80}$/.test(i.id) || ids.has(i.id)) throw new Error('Item ids must be unique letters, numbers, underscores or hyphens.');
    ids.add(i.id);
    if (![i.x, i.y, i.w, i.d, i.angle_deg].every(Number.isFinite)) throw new Error('Item positions, dimensions and angles must be finite numbers.');
    if (i.w <= 0 || i.d <= 0 || i.w > room.width * 2 || i.d > room.height * 2) throw new Error('Item dimensions are outside the planning range.');
    if (i.x < -room.width || i.x > room.width * 2 || i.y < -room.height || i.y > room.height * 2) throw new Error('Item position is outside the planning range.');
    if (i.angle_deg < -360 || i.angle_deg > 360) throw new Error('Item rotation must be between -360 and 360 degrees.');
    if (i.label !== undefined && (typeof i.label !== 'string' || i.label.length > 60)) throw new Error('Labels must contain at most 60 characters.');
    const item = { id: i.id, kind: i.kind, x: i.x, y: i.y, w: i.w, d: i.d, angle_deg: ((i.angle_deg % 360) + 360) % 360 };
    if (i.label !== undefined) item.label = i.label;
    return item;
  });
  return { version: 1, roomId: room.id, items };
}

/** Deterministic 10 cm grid search; clear footprints only, no occupancy claim. */
export function autoPlace(kind, items, roomId, id) {
  const room = roomFor(roomId), candidate = makeItem(kind, id, 0, 0);
  if (items.length >= 200 || items.some(item => item.id === id)) return null;
  const occupied = items.map(polygon);
  const zones = room.accessZones.map(z => [[z.x, z.y], [z.x + z.w, z.y], [z.x + z.w, z.y + z.d], [z.x, z.y + z.d]]);
  const fixed = (room.fixedFeatures || []).map(fixedPolygon);
  // Only test the candidate. Existing warnings need not prevent a new clear
  // placement, and rechecking all existing pairs at each grid cell is wasteful.
  for (let y = candidate.d / 2; y <= room.height - candidate.d / 2 + EPS; y += .1) {
    for (let x = candidate.w / 2; x <= room.width - candidate.w / 2 + EPS; x += .1) {
      candidate.x = Math.round(x * 1e6) / 1e6;
      candidate.y = Math.round(y * 1e6) / 1e6;
      const footprint = polygon(candidate);
      if (contained(footprint, room.polygon) && !zones.some(z => overlaps(footprint, z)) &&
          !fixed.some(f => overlaps(footprint, f)) &&
          !occupied.some(other => overlaps(footprint, other))) return { ...candidate };
    }
  }
  return null;
}
