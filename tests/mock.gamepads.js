const gamepads = [
  {
    axes: [0, 0, 0, 0],
    buttons: [
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 }
    ],
    connected: true,
    id: '17-button gamepad mockup (STANDARD Vendor: Alvaro Product: Montoro)',
    index: 0,
    mapping: 'standard',
    timestamp: 5200,
    vibrationActuator: {
      playEffect: (type, obj) => `${type} - ${obj.duration}`
    }
  },
  {
    axes: [0, 0],
    buttons: [
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 }
    ],
    connected: true,
    id: '10-button gamepad mockup (Vendor: Alvaro Product: Montoro10)',
    index: 1,
    mapping: '',
    timestamp: 5200,
    vibrationActuator: null
  }
];

const gamepadsFirefox = [
  {
    axes: [0, 0, 0, 0, 0],
    buttons: [
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 }
    ],
    connected: true,
    id: '17-button gamepad mockup (STANDARD Vendor: Alvaro Product: Montoro)',
    index: 0,
    mapping: 'standard',
    timestamp: 5200,
    hapticActuators: {
      pulse: (intensity, duration) => `vibrate at ${intensity} for ${duration}ms`
    }
  },
  {
    axes: [0, 0, 0],
    buttons: [
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 },
      { pressed: false, touched: false, value: 0 }
    ],
    connected: true,
    id: '10-button gamepad mockup (Vendor: Alvaro Product: Montoro10)',
    index: 1,
    mapping: '',
    timestamp: 5200,
    hapticActuators: null
  }
];

export { gamepads, gamepadsFirefox };
