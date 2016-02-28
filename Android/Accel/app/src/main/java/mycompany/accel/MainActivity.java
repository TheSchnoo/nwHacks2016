package mycompany.accel;

import android.app.Activity;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;

import com.firebase.client.Firebase;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends Activity implements SensorEventListener{

    SensorManager sensorManager;
    Sensor accellSensor;
    Firebase myFirebaseRef;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Firebase.setAndroidContext(this);
        setContentView(R.layout.activity_main);
        sensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);
        accellSensor = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER);
        sensorManager.registerListener(this, accellSensor, SensorManager.SENSOR_DELAY_NORMAL);
        myFirebaseRef = new Firebase("https://glowing-heat-1885.firebaseio.com/");
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        int stepValue = (int) event.values[0];
        Firebase Team2Ref = myFirebaseRef.child("Team_2");
        Firebase charmanderRef = Team2Ref.child("Charmander");
        Map<String, Object> steps = new HashMap<>();
        steps.put("steps", stepValue);
        charmanderRef.updateChildren(steps);
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {

    }
}
