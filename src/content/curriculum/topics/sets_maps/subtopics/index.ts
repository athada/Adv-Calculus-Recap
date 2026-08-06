import type { SubtopicContent } from '@/types/concept-content';

export const setsSubtopic: SubtopicContent = {
  id: 'sets',
  title: 'Sets',
  overview:
    'Sets are the vocabulary of mathematics — every number, function, and geometric object lives inside one. The three ideas below (membership, subset, operations) work together and are shown in a single interactive Venn diagram.',
  calculusBridge:
    'In advanced calculus you constantly restrict functions to subsets of their domain, integrate over regions, and take unions of open sets in topology. Every $\\varepsilon$-$\\delta$ argument begins by naming a set of points where a property holds.',
  groups: [
    {
      id: 'membership',
      title: 'Membership & equality',
      notations: [
        { symbol: 'x \\in A', label: 'Membership', description: '$x$ is an element of $A$.' },
        { symbol: 'x \\notin A', label: 'Non-membership', description: '$x$ is not in $A$.' },
        {
          symbol: 'A = B \\iff \\forall x\\,(x \\in A \\leftrightarrow x \\in B)',
          label: 'Extensionality',
          description: 'Two sets are equal iff they have the same elements.',
        },
      ],
      definition:
        'A set $A$ is a well-defined collection of objects. $x \\in A$ means $x$ belongs to $A$.',
      explanation:
        'Membership is the primitive relation of set theory — before we can say anything about numbers or functions, we must specify which objects belong to which collections.',
      relevance:
        'Without membership we cannot define the real numbers, state that a limit point belongs to a closure, or specify the domain of a function.',
      implications:
        'Extensionality lets us prove set equality by showing both contain the same elements — the standard proof technique in analysis.',
      calculusLink:
        'When we write “let $x \\in (a,b)$” in a limit proof, we are using membership to restrict attention to an open interval — a set of real numbers.',
      example: {
        title: 'Favorites playlist',
        description:
          'Each song is either in your Favorites set ($\\in$) or not ($\\notin$). Two playlists are the same iff they contain exactly the same songs.',
      },
    },
    {
      id: 'subset',
      title: 'Subsets',
      notations: [
        { symbol: 'A \\subseteq B', label: 'Subset', description: 'Every element of $A$ is in $B$.' },
        { symbol: 'A \\subset B', label: 'Proper subset', description: '$A \\subseteq B$ and $A \\neq B$.' },
        { symbol: '\\emptyset', label: 'Empty set', description: 'The set with no elements; subset of every set.' },
      ],
      definition:
        '$A \\subseteq B$ iff $\\forall x\\,(x \\in A \\Rightarrow x \\in B)$. Equivalently, $A \\subseteq B \\iff A \\cup B = B$.',
      explanation:
        'Subsets express “all of $A$ is contained in $B$” without requiring equality — like a chapter inside a book.',
      relevance:
        'Domains, ranges, compact sets inside larger spaces, and subspaces in linear algebra are all subset relationships.',
      implications:
        'If $A \\subseteq B$ then any property of all elements of $B$ automatically holds on $A$ — a key logical shortcut in proofs.',
      calculusLink:
        'A compact set $K \\subseteq \\mathbb{R}$ is a subset where every open cover has a finite subcover — central to the Extreme Value Theorem.',
      example: {
        title: 'Nested intervals',
        description:
          'Each interval $[a_n, b_n]$ can be a subset of the previous one. Nested set properties drive the Cantor intersection argument used in completeness proofs.',
      },
    },
    {
      id: 'operations',
      title: 'Union, intersection & difference',
      notations: [
        { symbol: 'A \\cup B = \\{x : x \\in A \\lor x \\in B\\}', label: 'Union', description: 'Elements in $A$ or $B$.' },
        { symbol: 'A \\cap B = \\{x : x \\in A \\land x \\in B\\}', label: 'Intersection', description: 'Elements in both.' },
        { symbol: 'A \\setminus B = \\{x : x \\in A \\land x \\notin B\\}', label: 'Difference', description: 'Elements in $A$ but not $B$.' },
      ],
      definition:
        'Set operations combine collections using logical connectives: $\\cup$ (or), $\\cap$ (and), $\\setminus$ (and not).',
      explanation:
        'These three operations are the algebra of sets — De Morgan’s laws connect them to complements and underpin probability and topology.',
      relevance:
        'Partitioning domains, splitting integrals over regions, and combining open sets in topology all use $\\cup$ and $\\cap$.',
      implications:
        'De Morgan: $(A \\cup B)^c = A^c \\cap B^c$. In analysis this switches between unions of open sets and intersections of closed sets.',
      calculusLink:
        'Fubini’s theorem integrates over product domains built from $\\times$; Green’s theorem relates integrals over a region and its boundary — both are set operations on geometric sets.',
      example: {
        title: 'Survey overlap',
        description:
          'Customers who like coffee ($A$) or tea ($B$) form $A \\cup B$. Those who like both form $A \\cap B$ — the same operations marketers and analysts use daily.',
      },
    },
  ],
};

export const relationsSubtopic: SubtopicContent = {
  id: 'relations',
  title: 'Relations',
  overview:
    'A relation links elements from one set to another. Cartesian products, binary relations, and domain/range are three faces of the same idea — explore them together in the interactive arrow diagram below.',
  calculusBridge:
    'Limits, continuity, and convergence are all defined via relations between $\\varepsilon$ and $\\delta$. Order relations ($\\leq$) organize the real line; equivalence relations appear in quotient spaces and modular arithmetic — all prerequisites for rigorous analysis.',
  groups: [
    {
      id: 'cartesian-product',
      title: 'Cartesian product',
      notations: [
        { symbol: 'A \\times B = \\{(a,b) : a \\in A,\\, b \\in B\\}', label: 'Product', description: 'All ordered pairs.' },
        { symbol: '(a,b) \\neq (b,a)', label: 'Order matters', description: 'Pairs are ordered unless $A = B$ and we impose symmetry.' },
      ],
      definition:
        '$A \\times B$ is the set of all ordered pairs with first coordinate in $A$ and second in $B$.',
      explanation:
        'The plane $\\mathbb{R}^2 = \\mathbb{R} \\times \\mathbb{R}$ is the archetype — every point is a pair $(x,y)$.',
      relevance:
        'Graphs of functions live in products; multivariable calculus is calculus on $\\mathbb{R}^n = \\mathbb{R} \\times \\cdots \\times \\mathbb{R}$.',
      implications:
        ' $|A \\times B| = |A| \\cdot |B|$ for finite sets. For infinite sets, products require care (e.g. $\\mathbb{R}^2$ is uncountable).',
      calculusLink:
        'A function $f: \\mathbb{R} \\to \\mathbb{R}$ has graph $\\{(x, f(x)) : x \\in \\mathbb{R}\\} \\subseteq \\mathbb{R} \\times \\mathbb{R}$ — a subset of a Cartesian product.',
      example: {
        title: 'Coordinate pairs',
        description:
          'GPS uses $(\\text{lat}, \\text{lon}) \\in \\mathbb{R} \\times \\mathbb{R}$. Swapping coordinates gives a different point — order in pairs matters.',
      },
    },
    {
      id: 'binary-relation',
      title: 'Binary relations',
      notations: [
        { symbol: 'R \\subseteq A \\times B', label: 'Relation', description: '$R$ is a subset of the product.' },
        { symbol: 'a R b \\iff (a,b) \\in R', label: 'Notation', description: 'Infix or set-membership form.' },
      ],
      definition:
        'A binary relation from $A$ to $B$ is any subset $R \\subseteq A \\times B$.',
      explanation:
        '“Less than,” “equals,” “divides,” and “converges to” are all relations — some are functions, most are not.',
      relevance:
        'Continuity at $a$ relates inputs near $a$ to outputs near $f(a)$ — a relation between neighborhoods, not a single formula.',
      implications:
        'Equivalence relations partition $A$ into disjoint classes; order relations let us take suprema and infima — foundations of $\\mathbb{R}$.',
      calculusLink:
        'The $\\varepsilon$-$\\delta$ definition of a limit is a relation: for every $\\varepsilon > 0$ there exists $\\delta > 0$ such that $|x - a| < \\delta$ implies $|f(x) - L| < \\varepsilon$.',
      example: {
        title: 'Social “follows”',
        description:
          'On a social network, “user $a$ follows user $b$” is a relation — not everyone follows back, so it need not be symmetric.',
      },
    },
    {
      id: 'domain-range',
      title: 'Domain & range',
      notations: [
        { symbol: '\\operatorname{dom}(R) = \\{a \\in A : \\exists b \\in B,\\, (a,b) \\in R\\}', label: 'Domain', description: 'First coordinates that participate.' },
        { symbol: '\\operatorname{ran}(R) = \\{b \\in B : \\exists a \\in A,\\, (a,b) \\in R\\}', label: 'Range', description: 'Second coordinates hit.' },
      ],
      definition:
        'Domain and range extract the “active” elements from each side of a relation.',
      explanation:
        'Before calling something a function we check that every domain element has a partner — domain/range clarify what a relation actually connects.',
      relevance:
        'Maximum domains of integration, supports of functions, and reachable states in dynamical systems are domain/range questions.',
      implications:
        'Restricting a relation to a smaller domain is a standard move — e.g. defining $1/x$ only on $\\mathbb{R} \\setminus \\{0\\}$.',
      calculusLink:
        'The domain of $f(x) = \\sqrt{x}$ is $[0,\\infty)$. In multivariable calculus, the domain of $f(x,y)$ is a subset of $\\mathbb{R}^2$ — often drawn as a region in the plane.',
      example: {
        title: 'Shipping routes',
        description:
          'If warehouses ship to stores, domain = warehouses that ship; range = stores that receive. Unused warehouses or unserved stores lie outside these sets.',
      },
    },
  ],
};

export const mapsSubtopic: SubtopicContent = {
  id: 'maps',
  title: 'Maps',
  overview:
    'A map is a relation with a strict rule: each input gets exactly one output. Definition, injectivity, and image/preimage complete the picture — use the interactive mapping diagram to see all three at once.',
  calculusBridge:
    'Calculus is the study of maps $f: \\mathbb{R} \\to \\mathbb{R}$ and their generalizations. Derivatives describe local linear approximations of maps; integrals accumulate over their domains; the Inverse Function Theorem requires bijectivity — all map properties from set theory.',
  groups: [
    {
      id: 'definition',
      title: 'Functions as special relations',
      notations: [
        { symbol: 'f : A \\to B', label: 'Function', description: 'Map from $A$ to $B$.' },
        { symbol: '\\forall a \\in A\\,\\exists! b \\in B : f(a) = b', label: 'Uniqueness', description: 'Exactly one output per input.' },
      ],
      definition:
        '$f \\subseteq A \\times B$ is a function iff every $a \\in A$ appears in exactly one pair $(a,b) \\in f$.',
      explanation:
        'Functions are the deterministic subset of relations — no ambiguity, no missing values (on the declared domain).',
      relevance:
        'Every formula $y = f(x)$, every transformation in linear algebra, every chart on a manifold is a function.',
      implications:
        'Composition $g \\circ f$ is defined when $\\operatorname{im}(f) \\subseteq \\operatorname{dom}(g)$ — chaining maps builds calculus and geometry.',
      calculusLink:
        '$f(x) = x^2$, $\\sin x$, and $\\int_0^x t\\,dt$ are all functions. Differentiation and integration are operators that take one function and produce another.',
      example: {
        title: 'Currency conversion',
        description:
          'Each dollar amount maps to exactly one euro value. Two different euro amounts for the same dollar would violate the definition of a function.',
      },
    },
    {
      id: 'injectivity',
      title: 'Injective, surjective, bijective',
      notations: [
        { symbol: 'f \\text{ injective} \\iff f(a_1)=f(a_2) \\Rightarrow a_1=a_2', label: 'One-to-one', description: 'Distinct inputs → distinct outputs.' },
        { symbol: 'f \\text{ surjective} \\iff \\operatorname{im}(f) = B', label: 'Onto', description: 'Every target is hit.' },
        { symbol: 'f \\text{ bijective}', label: 'Both', description: 'Invertible — has $f^{-1}$.' },
      ],
      definition:
        'Injective = no collisions; surjective = full coverage; bijective = both — a perfect matching between $A$ and $B$.',
      explanation:
        'Injectivity ensures inverse functions exist locally; surjectivity ensures every target value is actually achieved.',
      relevance:
        'The Inverse Function Theorem, change of variables in integration, and isomorphisms in algebra all require bijectivity or local bijectivity.',
      implications:
        'Bijective maps have two-sided inverses. For finite sets, $|A| = |B|$ is necessary for a bijection.',
      calculusLink:
        'If $f$ is strictly monotonic on an interval, it is bijective onto its image — enabling inverse functions like $\\ln$ and $\\arcsin$. The Jacobian measures local “volume scaling” of bijective maps $\\mathbb{R}^n \\to \\mathbb{R}^n$.',
      example: {
        title: 'Temperature conversion',
        description:
          '$F = \\frac{9}{5}C + 32$ is bijective between Celsius and Fahrenheit — you can convert back uniquely.',
      },
    },
    {
      id: 'image-preimage',
      title: 'Image & preimage',
      notations: [
        { symbol: '\\operatorname{im}(f) = \\{f(a) : a \\in A\\}', label: 'Image', description: 'Values actually taken.' },
        { symbol: 'f^{-1}(S) = \\{a \\in A : f(a) \\in S\\}', label: 'Preimage', description: 'Inputs landing in $S$.' },
      ],
      definition:
        'Image collects outputs; preimage pulls a target set back to all inputs that map into it.',
      explanation:
        'Preimages connect set operations on the codomain to set operations on the domain — essential for measure theory and topology.',
      relevance:
        'Level sets $\\{(x,y) : f(x,y) = c\\}$ are preimages $\\{c\\}$. Continuity is defined via preimages of open sets.',
      implications:
        '$f^{-1}(S \\cup T) = f^{-1}(S) \\cup f^{-1}(T)$ always; but $f(S \\cap T) \\subseteq f(S) \\cap f(T)$ with strict inclusion possible.',
      calculusLink:
        'Integrating over $\\{(x,y) : 0 \\leq f(x,y) \\leq 1\\}$ uses a preimage. In topology, $f$ is continuous iff $f^{-1}(U)$ is open for every open $U$ — the bridge to advanced calculus on manifolds.',
      example: {
        title: 'Exam score bands',
        description:
          'Students scoring 90–100 form the preimage $f^{-1}([90,100])$ under the “score” function — the set of all inputs mapping into that grade band.',
      },
    },
  ],
};

export const setTheorySubtopics = {
  sets: setsSubtopic,
  relations: relationsSubtopic,
  maps: mapsSubtopic,
} as const;
