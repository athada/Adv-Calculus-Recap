export type Paradigm = 'coord_free' | 'coord_dep' | 'both';

export interface ParadigmView {
  overview: string;
  tools: string[];
}

export interface RoadmapNode {
  id: string;
  stage_number: number;
  stage_title: string;
  title: string;
  order: number;
  parents: string[];
  paradigm: Paradigm;
  paradigm_label: string;
  summary: string;
  key_equations: string[];
  coordinate_free: ParadigmView;
  coordinate_dependent: ParadigmView;
}

export const roadmapNodes: RoadmapNode[] = [
  {
    id: 'sets_maps',
    stage_number: 1,
    stage_title: 'Logic, Sets & Abstract Mappings',
    title: 'Set Theory & Mappings',
    order: 1,
    parents: [],
    paradigm: 'coord_free',
    paradigm_label: 'Coordinate-Free (Geometric / Invariant)',
    summary: 'Sets, Maps f: A → B, Bijections & Cardinality',
    key_equations: ['f: A \\to B', 'f^{-1}(B)', 'A \\times B'],
    coordinate_free: {
      overview: 'Abstract maps between sets without coordinate systems or numerical bases.',
      tools: ['Abstract sets & elements', 'Domain/Codomain mappings', 'Bijections & Inverse maps'],
    },
    coordinate_dependent: {
      overview: 'N/A (No coordinates exist at this level).',
      tools: ['N/A (Pure abstract structural relations)'],
    },
  },
  {
    id: 'real_analysis',
    stage_number: 2,
    stage_title: '1D Analysis & Metric Spaces',
    title: 'Real Analysis',
    order: 2,
    parents: ['sets_maps'],
    paradigm: 'both',
    paradigm_label: 'Dual Paradigm (Both Integrated)',
    summary: 'ε-δ Limits, Continuity, Sequences & Completeness',
    key_equations: [
      '\\forall \\varepsilon > 0, \\exists \\delta > 0',
      '\\lim_{n \\to \\infty} x_n = L',
    ],
    coordinate_free: {
      overview: 'Completeness of $\\mathbb{R}$ constructed via Cauchy equivalence classes.',
      tools: ['Cauchy sequence completeness', 'Dedekind cuts', 'Topological limit points'],
    },
    coordinate_dependent: {
      overview: 'Numerical bounds and coordinate intervals on the real number line.',
      tools: ['Inequality bounds $|x - y| < \\varepsilon$ on real line $\\mathbb{R}$'],
    },
  },
  {
    id: 'metric_spaces',
    stage_number: 2,
    stage_title: '1D Analysis & Metric Spaces',
    title: 'Metric Spaces (X, d)',
    order: 3,
    parents: ['real_analysis'],
    paradigm: 'coord_free',
    paradigm_label: 'Coordinate-Free (Geometric / Invariant)',
    summary: 'Distance Functions d(x,y), Open Balls B_ε(x), Compactness',
    key_equations: [
      'd(x,z) \\le d(x,y) + d(y,z)',
      'B_\\varepsilon(p) = \\{x \\in X : d(x,p) < \\varepsilon\\}',
    ],
    coordinate_free: {
      overview: 'Sets endowed with a metric $d$ satisfying symmetric distance axioms without axes.',
      tools: ['Abstract metric $d(p,q)$', 'Open balls $B_\\varepsilon(p)$', 'Triangle inequality axiom'],
    },
    coordinate_dependent: {
      overview: 'Euclidean norm calculations using vector components.',
      tools: ['Euclidean p-norms $\\|x - y\\|_p$', 'Coordinate distance formulas'],
    },
  },
  {
    id: 'lin_alg',
    stage_number: 3,
    stage_title: 'Linear & Multilinear Algebra',
    title: 'Linear Algebra',
    order: 4,
    parents: ['sets_maps'],
    paradigm: 'both',
    paradigm_label: 'Dual Paradigm (Both Integrated)',
    summary: 'Vector Spaces V, Bases, Linear Maps T: V → W',
    key_equations: ['T(cu+v) = cT(u)+T(v)', 'Av = \\lambda v'],
    coordinate_free: {
      overview: 'Linear transformations between abstract vector spaces independent of basis selection.',
      tools: ['Vector space axioms $V$', 'Linear maps $T: V \\to W$', 'Kernel & Image subspaces'],
    },
    coordinate_dependent: {
      overview: 'Matrix operators acting on numerical column vectors $v^i$.',
      tools: ['Basis vectors $\\{e_i\\}$', 'Matrix representations $[T]$', 'Column vector tuples $v^i$'],
    },
  },
  {
    id: 'dual_spaces',
    stage_number: 3,
    stage_title: 'Linear & Multilinear Algebra',
    title: 'Dual Spaces & Covectors',
    order: 5,
    parents: ['lin_alg'],
    paradigm: 'both',
    paradigm_label: 'Dual Paradigm (Both Integrated)',
    summary: 'Linear Functionals V*, Dual Basis e^i, 1-Forms',
    key_equations: ['\\alpha \\in V^* : V \\to \\mathbb{R}', 'e^i(e_j) = \\delta^i_j'],
    coordinate_free: {
      overview: 'Linear scalar-valued functionals on vector space $V$ acting as linear measurement planes.',
      tools: ['Linear functionals $\\alpha \\in V^*$', 'Pairing $\\langle \\alpha, v \\rangle = \\alpha(v)$', 'Hyperplane level sets'],
    },
    coordinate_dependent: {
      overview: 'Row covectors $\\alpha_i$ operating on column vectors $v^i$ via matrix multiplication.',
      tools: ['Dual basis $e^i$', 'Row covectors $\\alpha_i$', 'Kronecker delta $\\delta^i_j$'],
    },
  },
  {
    id: 'multilin_tensors',
    stage_number: 3,
    stage_title: 'Linear & Multilinear Algebra',
    title: 'Multilinear Algebra & Tensors',
    order: 6,
    parents: ['dual_spaces'],
    paradigm: 'coord_dep',
    paradigm_label: 'Coordinate-Dependent (Components / Indices)',
    summary: 'Tensor Products V ⊗ W, (k,l)-Tensors, Index Mechanics',
    key_equations: [
      'T: V^* \\times \\dots \\times V \\to \\mathbb{R}',
      'T^{i_1...i_k}{}_{j_1...j_l}',
    ],
    coordinate_free: {
      overview: 'Multilinear maps taking $k$ covectors and $l$ vectors into scalars.',
      tools: ['Tensor product $V \\otimes W$', 'Multilinear map definition', 'Contraction map $C$'],
    },
    coordinate_dependent: {
      overview: 'Multi-index components transforming under basis change matrices $P^i_j$.',
      tools: [
        'Multi-index arrays $T^{i_1...i_k}{}_{j_1...j_l}$',
        'Einstein summation',
        'Jacobian basis transformations',
      ],
    },
  },
  {
    id: 'multi_calc',
    stage_number: 4,
    stage_title: 'Multivariable Calculus & Analysis',
    title: 'Multivariable Calculus & Jacobians',
    order: 7,
    parents: ['metric_spaces', 'lin_alg'],
    paradigm: 'both',
    paradigm_label: 'Dual Paradigm (Both Integrated)',
    summary: 'Partials, Gradients, Jacobians Df(p), Inverse Function Theorem',
    key_equations: [
      'J_{ij} = \\frac{\\partial f_i}{\\partial x^j}',
      'Df(p) : T_p \\mathbb{R}^n \\to T_{f(p)} \\mathbb{R}^m',
    ],
    coordinate_free: {
      overview: 'Derivative as best local linear approximation map $Df(p)$ between tangent spaces.',
      tools: ['Best local linear map $Df(p)$', 'Fréchet derivative', 'Differential operator'],
    },
    coordinate_dependent: {
      overview: 'Matrix of partial derivatives transforming local grid coordinates.',
      tools: ['Jacobian matrix $J_{ij}$', 'Partial derivatives $\\partial f_i/\\partial x^j$', 'Gradient vector $\\nabla f$'],
    },
  },
  {
    id: 'general_topology',
    stage_number: 5,
    stage_title: 'Point-Set & Differential Topology',
    title: 'General Point-Set Topology',
    order: 8,
    parents: ['metric_spaces'],
    paradigm: 'coord_free',
    paradigm_label: 'Coordinate-Free (Geometric / Invariant)',
    summary: 'Topological Spaces (X, τ), Homeomorphisms, Quotient Spaces',
    key_equations: ['\\tau \\subseteq \\mathcal{P}(X)', 'f: X \\to Y \\text{ continuous}'],
    coordinate_free: {
      overview: 'Spaces defined purely by open sets $\\tau$ without distance metrics or coordinates.',
      tools: ['Open topology $\\tau$', 'Homeomorphisms $f: X \\cong Y$', 'Connectedness & Compactness'],
    },
    coordinate_dependent: {
      overview: 'N/A (Pure coordinate-free topological structure).',
      tools: ['N/A (Strictly coordinate-free invariant structure)'],
    },
  },
  {
    id: 'diff_topology',
    stage_number: 5,
    stage_title: 'Point-Set & Differential Topology',
    title: 'Differential Topology',
    order: 9,
    parents: ['general_topology', 'multi_calc'],
    paradigm: 'coord_free',
    paradigm_label: 'Coordinate-Free (Geometric / Invariant)',
    summary: 'Smooth Maps, Immersions, Submersions, Transversality, de Rham Cohomology',
    key_equations: [
      'd(f \\circ g) = df \\circ dg',
      'H^k_{dR}(M) = \\frac{\\text{Ker}(d_k)}{\\text{Img}(d_{k-1})}',
    ],
    coordinate_free: {
      overview: 'Global topological invariants studied via smooth functions & differential forms.',
      tools: ['Smooth maps between manifolds', 'de Rham Cohomology $H^k_{dR}(M)$', 'Transversality & Submersions'],
    },
    coordinate_dependent: {
      overview: 'Local chart overlaps and smooth transition functions.',
      tools: ['Chart transition functions $\\psi \\circ \\phi^{-1}$', 'Local coordinate expressions'],
    },
  },
  {
    id: 'diff_forms',
    stage_number: 6,
    stage_title: 'Exterior Calculus',
    title: 'Differential Forms & Exterior Calculus',
    order: 10,
    parents: ['multilin_tensors', 'diff_topology'],
    paradigm: 'coord_free',
    paradigm_label: 'Coordinate-Free (Geometric / Invariant)',
    summary: 'Wedge Product ω ∧ η, Exterior Derivative d, Generalized Stokes',
    key_equations: [
      'dx^i \\wedge dx^j = -dx^j \\wedge dx^i',
      '\\int_{\\partial \\Omega} \\omega = \\int_{\\Omega} d\\omega',
    ],
    coordinate_free: {
      overview: 'Alternating multilinear forms as natural integrands on geometric spaces without coordinates.',
      tools: ['Wedge product $\\omega \\wedge \\eta$', 'Exterior derivative $d$ ($d^2=0$)', 'Generalized Stokes Theorem', 'Pullback $f^*\\omega$'],
    },
    coordinate_dependent: {
      overview: 'Linear combinations of $dx^{i_1} \\wedge \\cdots \\wedge dx^{i_k}$ basis forms.',
      tools: ['Basis forms $dx^{i_1} \\wedge \\cdots \\wedge dx^{i_k}$', 'Component forms $\\omega = f_I\\, dx^I$'],
    },
  },
  {
    id: 'smooth_manifolds',
    stage_number: 7,
    stage_title: 'Differential & Riemannian Geometry',
    title: 'Smooth Manifolds & Tangent Bundles',
    order: 11,
    parents: ['diff_topology', 'diff_forms'],
    paradigm: 'both',
    paradigm_label: 'Dual Paradigm (Both Integrated)',
    summary: 'Atlases, Charts, Tangent Bundle TM, Cotangent Bundle T*M',
    key_equations: [
      '\\psi \\circ \\phi^{-1} : \\mathbb{R}^n \\to \\mathbb{R}^n',
      'v = v^i \\frac{\\partial}{\\partial x^i}',
    ],
    coordinate_free: {
      overview: 'Abstract manifold locally homeomorphic to $\\mathbb{R}^n$ with smooth atlases.',
      tools: ['Abstract manifold $M$', 'Tangent bundle $TM$', 'Vector fields as derivations $X(f)$'],
    },
    coordinate_dependent: {
      overview: 'Coordinate charts with transition Jacobians.',
      tools: ['Coordinate charts $(U, x^i)$', 'Basis vectors $\\partial/\\partial x^i$', 'Transformation Jacobians'],
    },
  },
  {
    id: 'riemannian_geometry',
    stage_number: 7,
    stage_title: 'Differential & Riemannian Geometry',
    title: 'Riemannian Geometry & Tensor Calculus',
    order: 12,
    parents: ['smooth_manifolds'],
    paradigm: 'both',
    paradigm_label: 'Dual Paradigm (Both Integrated)',
    summary: 'Metric g_ij, Covariant Derivative ∇_μ, Levi-Civita, Riemann Curvature R^ρ_σμν',
    key_equations: [
      '\\nabla_\\mu V^\\nu = \\partial_\\mu V^\\nu + \\Gamma^\\nu_{\\mu\\lambda} V^\\lambda',
      'R^\\rho_{\\sigma\\mu\\nu}',
    ],
    coordinate_free: {
      overview: 'Curvature measuring parallel transport loop non-commutation on metric manifolds.',
      tools: ['Metric tensor $g(-,-)$', 'Levi-Civita connection $\\nabla$', 'Riemann curvature $R(X,Y)Z$', 'Geodesic flow'],
    },
    coordinate_dependent: {
      overview: 'Index differential calculations with Christoffel symbols $\\Gamma^\\lambda_{\\mu\\nu}$.',
      tools: [
        'Metric components $g_{ij}$',
        'Christoffel symbols $\\Gamma^\\lambda_{\\mu\\nu}$',
        'Riemann tensor components $R^\\rho_{\\sigma\\mu\\nu}$',
        'Index lowering/raising',
      ],
    },
  },
];

export function getRoadmapNode(id: string): RoadmapNode | undefined {
  return roadmapNodes.find((node) => node.id === id);
}

export function buildEdgesFromRoadmap(nodes: RoadmapNode[]) {
  return nodes.flatMap((node) =>
    node.parents.map((parentId) => ({
      source: parentId,
      target: node.id,
    })),
  );
}
