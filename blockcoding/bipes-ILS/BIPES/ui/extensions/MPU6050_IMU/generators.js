// MPU6050 IMU Code Generators - Using mpu6500.py library

Blockly.Python['mpu6050_init'] = function(block) {
  var scl_pin = Blockly.Python.valueToCode(block, 'SCL_PIN', Blockly.Python.ORDER_ATOMIC) || '22';
  var sda_pin = Blockly.Python.valueToCode(block, 'SDA_PIN', Blockly.Python.ORDER_ATOMIC) || '21';
  
  // Add necessary imports
  Blockly.Python.definitions_['import_pin'] = 'from machine import Pin, I2C';
  Blockly.Python.definitions_['import_time'] = 'import time';
  Blockly.Python.definitions_['import_math'] = 'import math';
  Blockly.Python.definitions_['import_mpu6500'] = 'from ils.mpu import MPU6500, SF_M_S2, SF_RAD_S, ACCEL_FS_SEL_2G, GYRO_FS_SEL_250DPS';
  
  // Kalman filter class
  Blockly.Python.definitions_['kalman_filter'] = 
    'class KalmanAngle:\n' +
    '    def __init__(self):\n' +
    '        self.QAngle = 0.001\n' +
    '        self.QBias = 0.003\n' +
    '        self.RMeasure = 0.1\n' +
    '        self.angle = 0.0\n' +
    '        self.bias = 0.0\n' +
    '        self.P = [[0.0, 0.0], [0.0, 0.0]]\n' +
    '    \n' +
    '    def getAngle(self, newAngle, newRate, dt):\n' +
    '        self.angle += dt * (newRate - self.bias)\n' +
    '        self.P[0][0] += dt * (dt * self.P[1][1] - self.P[0][1] - self.P[1][0] + self.QAngle)\n' +
    '        self.P[0][1] -= dt * self.P[1][1]\n' +
    '        self.P[1][0] -= dt * self.P[1][1]\n' +
    '        self.P[1][1] += self.QBias * dt\n' +
    '        y = newAngle - self.angle\n' +
    '        s = self.P[0][0] + self.RMeasure\n' +
    '        K = [self.P[0][0] / s, self.P[1][0] / s]\n' +
    '        self.angle += K[0] * y\n' +
    '        self.bias += K[1] * y\n' +
    '        P00 = self.P[0][0]\n' +
    '        P01 = self.P[0][1]\n' +
    '        self.P[0][0] -= K[0] * P00\n' +
    '        self.P[0][1] -= K[0] * P01\n' +
    '        self.P[1][0] -= K[1] * P00\n' +
    '        self.P[1][1] -= K[1] * P01\n' +
    '        return self.angle\n';
  
  // Helper functions for angle calculation
  Blockly.Python.definitions_['mpu_helpers'] = 
    'def mpu_acc_angle(accel):\n' +
    '    # Convert m/s² back to g for angle calculation\n' +
    '    ax = accel[0] / 9.80665\n' +
    '    ay = accel[1] / 9.80665\n' +
    '    az = accel[2] / 9.80665\n' +
    '    pitch = math.atan2(ay, math.sqrt(ax**2 + az**2)) * 180 / math.pi\n' +
    '    roll = math.atan2(-ax, az) * 180 / math.pi\n' +
    '    return (pitch, roll)\n' +
    '\n' +
    'def mpu_complementary_filter(acc_angle, gyro_rate, last_angle, dt, alpha=0.98):\n' +
    '    # Convert rad/s to deg/s\n' +
    '    gyro_deg = gyro_rate * 180 / math.pi\n' +
    '    angle = alpha * (last_angle + gyro_deg * dt) + (1 - alpha) * acc_angle\n' +
    '    return angle\n';
  
  // Initialize I2C and MPU6050
  Blockly.Python.definitions_['mpu_i2c'] = 'mpu_i2c = I2C(0, scl=Pin(' + scl_pin + '), sda=Pin(' + sda_pin + '), freq=400000)';
  Blockly.Python.definitions_['mpu_sensor'] = 'mpu = MPU6500(mpu_i2c, accel_sf=SF_M_S2, gyro_sf=SF_RAD_S)';
  
  // State variables for filtering
  Blockly.Python.definitions_['mpu_state'] = 
    'mpu_last_time = time.ticks_ms()\n' +
    'mpu_last_pitch_c = 0.0\n' +
    'mpu_last_roll_c = 0.0\n' +
    'mpu_kalman_pitch = KalmanAngle()\n' +
    'mpu_kalman_roll = KalmanAngle()';
  
  var code = 'print("MPU6050 initialized")\n';
  return code;
};

// Accelerometer generators
Blockly.Python['mpu6050_accel_x'] = function(block) {
  var code = 'mpu.acceleration[0]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['mpu6050_accel_y'] = function(block) {
  var code = 'mpu.acceleration[1]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['mpu6050_accel_z'] = function(block) {
  var code = 'mpu.acceleration[2]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['mpu6050_accel_all'] = function(block) {
  var code = 'mpu.acceleration';
  return [code, Blockly.Python.ORDER_MEMBER];
};

// Gyroscope generators
Blockly.Python['mpu6050_gyro_x'] = function(block) {
  var code = 'mpu.gyro[0]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['mpu6050_gyro_y'] = function(block) {
  var code = 'mpu.gyro[1]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['mpu6050_gyro_z'] = function(block) {
  var code = 'mpu.gyro[2]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['mpu6050_gyro_all'] = function(block) {
  var code = 'mpu.gyro';
  return [code, Blockly.Python.ORDER_MEMBER];
};

// Temperature generator
Blockly.Python['mpu6050_temperature'] = function(block) {
  var code = 'mpu.temperature';
  return [code, Blockly.Python.ORDER_MEMBER];
};

// Kalman filtered angle generators
Blockly.Python['mpu6050_pitch_kalman'] = function(block) {
  // Generate inline function for Kalman pitch
  var functionCode = 
    'def mpu_get_pitch_kalman():\n' +
    '    global mpu_last_time\n' +
    '    t_now = time.ticks_ms()\n' +
    '    dt = time.ticks_diff(t_now, mpu_last_time) / 1000.0\n' +
    '    mpu_last_time = t_now\n' +
    '    accel = mpu.acceleration\n' +
    '    gyro = mpu.gyro\n' +
    '    acc_angles = mpu_acc_angle(accel)\n' +
    '    # gyro[1] is Y-axis rotation (pitch)\n' +
    '    angle = mpu_kalman_pitch.getAngle(acc_angles[0], gyro[1], dt)\n' +
    '    return angle\n';
  
  Blockly.Python.definitions_['mpu_get_pitch_kalman'] = functionCode;
  
  var code = 'mpu_get_pitch_kalman()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['mpu6050_roll_kalman'] = function(block) {
  // Generate inline function for Kalman roll
  var functionCode = 
    'def mpu_get_roll_kalman():\n' +
    '    global mpu_last_time\n' +
    '    t_now = time.ticks_ms()\n' +
    '    dt = time.ticks_diff(t_now, mpu_last_time) / 1000.0\n' +
    '    mpu_last_time = t_now\n' +
    '    accel = mpu.acceleration\n' +
    '    gyro = mpu.gyro\n' +
    '    acc_angles = mpu_acc_angle(accel)\n' +
    '    # gyro[0] is X-axis rotation (roll)\n' +
    '    angle = mpu_kalman_roll.getAngle(acc_angles[1], gyro[0], dt)\n' +
    '    return angle\n';
  
  Blockly.Python.definitions_['mpu_get_roll_kalman'] = functionCode;
  
  var code = 'mpu_get_roll_kalman()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// Complementary filtered angle generators
Blockly.Python['mpu6050_pitch_complementary'] = function(block) {
  var functionCode = 
    'def mpu_get_pitch_comp():\n' +
    '    global mpu_last_time, mpu_last_pitch_c\n' +
    '    t_now = time.ticks_ms()\n' +
    '    dt = time.ticks_diff(t_now, mpu_last_time) / 1000.0\n' +
    '    mpu_last_time = t_now\n' +
    '    accel = mpu.acceleration\n' +
    '    gyro = mpu.gyro\n' +
    '    acc_angles = mpu_acc_angle(accel)\n' +
    '    mpu_last_pitch_c = mpu_complementary_filter(acc_angles[0], gyro[1], mpu_last_pitch_c, dt)\n' +
    '    return mpu_last_pitch_c\n';
  
  Blockly.Python.definitions_['mpu_get_pitch_comp'] = functionCode;
  
  var code = 'mpu_get_pitch_comp()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['mpu6050_roll_complementary'] = function(block) {
  var functionCode = 
    'def mpu_get_roll_comp():\n' +
    '    global mpu_last_time, mpu_last_roll_c\n' +
    '    t_now = time.ticks_ms()\n' +
    '    dt = time.ticks_diff(t_now, mpu_last_time) / 1000.0\n' +
    '    mpu_last_time = t_now\n' +
    '    accel = mpu.acceleration\n' +
    '    gyro = mpu.gyro\n' +
    '    acc_angles = mpu_acc_angle(accel)\n' +
    '    mpu_last_roll_c = mpu_complementary_filter(acc_angles[1], gyro[0], mpu_last_roll_c, dt)\n' +
    '    return mpu_last_roll_c\n';
  
  Blockly.Python.definitions_['mpu_get_roll_comp'] = functionCode;
  
  var code = 'mpu_get_roll_comp()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// Calibration generator
Blockly.Python['mpu6050_calibrate'] = function(block) {
  var samples = Blockly.Python.valueToCode(block, 'SAMPLES', Blockly.Python.ORDER_ATOMIC) || '100';
  
  var code = 'print("Calibrating MPU6050... Keep still!")\n';
  code += 'mpu.calibrate(count=' + samples + ', delay=10)\n';
  code += 'print("Calibration complete!")\n';
  return code;
};