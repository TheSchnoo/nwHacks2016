package mycompany.accel;

import android.app.Activity;
import android.content.Intent;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.firebase.client.Firebase;

import java.util.HashMap;
import java.util.Map;

public class SendInformation extends Activity implements SensorEventListener{

    SensorManager sensorManager;
    Sensor accellSensor;
    Firebase myFirebaseRef;
    String user;
    String team;
    TextView stepCountText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Firebase.setAndroidContext(this);
        setContentView(R.layout.activity_send_information);
        stepCountText = (TextView) findViewById(R.id.stepCountText);
        sensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);
        accellSensor = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER);
        sensorManager.registerListener(this, accellSensor, SensorManager.SENSOR_DELAY_NORMAL);
        myFirebaseRef = new Firebase("https://glowing-heat-1885.firebaseio.com/");
        Intent intent = getIntent();
        Bundle extras = intent.getExtras();
        team = extras.getString("team");
        user = extras.getString("username");
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        int stepValue = (int) event.values[0];
        Firebase Team2Ref = myFirebaseRef.child(team);
        Firebase charmanderRef = Team2Ref.child(user);
        Map<String, Object> steps = new HashMap<>();
        steps.put("steps", stepValue);
        charmanderRef.updateChildren(steps);
        stepCountText.setText(String.valueOf(stepValue));
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {

    }
}
