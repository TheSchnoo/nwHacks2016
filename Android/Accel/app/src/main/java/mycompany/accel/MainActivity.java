package mycompany.accel;

import android.app.Activity;
import android.content.Intent;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.firebase.client.DataSnapshot;
import com.firebase.client.Firebase;
import com.firebase.client.FirebaseError;
import com.firebase.client.ValueEventListener;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends Activity {

    Firebase myFirebaseRef;
    EditText nameText;
    Button startBtn;
    String user = "";
    String team;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Firebase.setAndroidContext(this);
        setContentView(R.layout.activity_main);

        nameText = (EditText) findViewById(R.id.editText);
        startBtn = (Button) findViewById(R.id.startBtn);

        startBtn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                updateNameFirebase(nameText.getText().toString());
            }
        });

        myFirebaseRef = new Firebase("https://glowing-heat-1885.firebaseio.com/");
    }

    public void updateNameFirebase(final String userName){
        user = userName;
        team = "Team_1";
//        Firebase Team1Ref = myFirebaseRef.child("Team_1");
//        Firebase Team2Ref = myFirebaseRef.child("Team_2");
//        Team1Ref.addListenerForSingleValueEvent(new ValueEventListener() {
//            @Override
//            public void onDataChange(DataSnapshot dataSnapshot) {
//                for(DataSnapshot child : dataSnapshot.getChildren()){
//                    if(child.getKey() == userName){
//                        user = userName;
//                        team = "Team_1";
//                        System.out.println("first");
//                        break;
//                    }
//                }
//            }
//
//            @Override
//            public void onCancelled(FirebaseError firebaseError) {
//
//            }
//        });
//        Team2Ref.addListenerForSingleValueEvent(new ValueEventListener() {
//            @Override
//            public void onDataChange(DataSnapshot dataSnapshot) {
//                for(DataSnapshot child : dataSnapshot.getChildren()){
//                    if(child.getKey() == userName) {
//                        user = userName;
//                        team = "Team_2";
//                        System.out.println("second");
//                        break;
//                    }
//                }
//            }
//
//            @Override
//            public void onCancelled(FirebaseError firebaseError) {
//
//            }
//        });
        if(user == ""){
            Log.e("XX", "Invalid user");
        }
        Intent intent = new Intent(this, SendInformation.class);
        Bundle extras = new Bundle();
        extras.putString("username", user);
        extras.putString("team", team);
        intent.putExtras(extras);
        startActivity(intent);
    }
}
