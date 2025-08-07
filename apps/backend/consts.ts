export const DILEMA_CONSTANTS = {
  VALIDATION: {
    TITULO: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 100,
    },
    CONTENIDO: {
      MIN_LENGTH: 10,
      MAX_LENGTH: 5000,
    },
    INTENSIDAD: {
      MIN: 0,
      MAX: 100,
      DEFAULT: 50,
    },
  },
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },
  PERFIL: {
    DEFAULT_VALUES: {
      BIENESTAR: 50,
      AUTOCONOCIMIENTO: 50,
      GESTION_EMOCIONAL: 50,
      DILEMAS_TOTALES: 1,
      DIAS_ACTIVO: 1,
    },
  },
  MESSAGES: {
    SUCCESS: {
      CREATED: 'Dilema creado exitosamente',
      RETRIEVED: 'Dilemas obtenidos exitosamente',
    },
    ERROR: {
      USER_NOT_FOUND: 'Usuario no encontrado',
      EMAIL_NOT_VERIFIED: 'Debes verificar tu email antes de crear dilemas',
      EMOTION_INTENSITY_MISMATCH: 'Debe haber una intensidad por cada emoción',
      INVALID_INTENSITY_RANGE: 'Las intensidades deben estar entre 0 y 100',
      CREATE_FAILED: 'Error al crear el dilema',
      GET_FAILED: 'Error al obtener los dilemas',
    },
  },
  ERROR_CODES: {
    CREATE_DILEMA_ERROR: 'CREATE_DILEMA_ERROR',
    GET_DILEMAS_ERROR: 'GET_DILEMAS_ERROR',
  },
} as const;

export const EMOTION_DETECTION_PATTERNS = {
  miedo: ['miedo', 'temor', 'asustado', 'terror', 'pánico', 'espanto'],
  tristeza: ['triste', 'tristeza', 'deprimido', 'melancólico', 'dolor', 'pena'],
  ansiedad: ['ansioso', 'ansiedad', 'nervioso', 'preocupado', 'estrés', 'angustia'],
  ira: ['enojado', 'ira', 'furioso', 'molesto', 'indignado', 'rabia'],
  culpa: ['culpa', 'culpable', 'arrepentido', 'remordimiento'],
  verguenza: ['vergüenza', 'avergonzado', 'humillado', 'bochorno'],
  alegria: ['feliz', 'alegre', 'contento', 'gozo', 'eufórico', 'dichoso'],
  frustracion: ['frustrado', 'frustración', 'desesperado', 'impotente'],
  esperanza: ['esperanza', 'optimista', 'confianza', 'fe'],
  sorpresa: ['sorprendido', 'asombrado', 'impactado', 'inesperado'],
  alivio: ['alivio', 'tranquilo', 'calmado', 'relajado'],
  resignacion: ['resignado', 'conformado', 'aceptación'],
  euforia: ['eufórico', 'exaltado', 'entusiasmado'],
  nostalgia: ['nostálgico', 'añoranza', 'melancolía'],
  celos: ['celoso', 'envidia', 'envidiado'],
  rechazo: ['rechazado', 'despreciado', 'ignorado'],
  aburrimiento: ['aburrido', 'hastío', 'tedio'],
  inseguridad: ['inseguro', 'dudoso', 'vacilante'],
  gratitud: ['agradecido', 'gratitud', 'reconocimiento'],
  afecto: ['cariño', 'amor', 'ternura', 'afecto'],
} as const;

// Constantes para HTTP Status y códigos de respuesta
export const HTTP_CONSTANTS = {
  STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  RESPONSES: {
    SUCCESS: true,
    FAILURE: false,
  },
} as const;

// Constantes para validación general
export const VALIDATION_CONSTANTS = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
  },
  USER: {
    NAME: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 50,
    },
  },
} as const;
