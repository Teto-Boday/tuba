package app.tuba.teto;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.IBinder;
import android.os.PowerManager;

public class AudioKeepService extends Service {
    private static final String CH = "tuba_quran";
    private PowerManager.WakeLock wl;
    private WifiManager.WifiLock wf;

    @Override public IBinder onBind(Intent i) { return null; }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        String title = intent != null && intent.getStringExtra("title") != null ? intent.getStringExtra("title") : "طُوبَى";
        String text = intent != null && intent.getStringExtra("text") != null ? intent.getStringExtra("text") : "التلاوة شغالة";
        NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= 26 && nm.getNotificationChannel(CH) == null) {
            NotificationChannel c = new NotificationChannel(CH, "تلاوة القرآن", NotificationManager.IMPORTANCE_LOW);
            c.setShowBadge(false); nm.createNotificationChannel(c);
        }
        Intent open = getPackageManager().getLaunchIntentForPackage(getPackageName());
        PendingIntent pi = PendingIntent.getActivity(this, 0, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Notification.Builder b = Build.VERSION.SDK_INT >= 26 ? new Notification.Builder(this, CH) : new Notification.Builder(this);
        int icon = getResources().getIdentifier("ic_launcher_foreground", "mipmap", getPackageName());
        if (icon == 0) icon = getApplicationInfo().icon;
        Notification n = b.setContentTitle(title).setContentText(text).setSmallIcon(icon).setContentIntent(pi).setOngoing(true).build();
        if (Build.VERSION.SDK_INT >= 29) startForeground(7, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK); else startForeground(7, n);
        if (wl == null) {
            wl = ((PowerManager) getSystemService(Context.POWER_SERVICE)).newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "tuba:quran");
            wl.setReferenceCounted(false); wl.acquire(6 * 60 * 60 * 1000L);
        }
        if (wf == null) {
            try { wf = ((WifiManager) getApplicationContext().getSystemService(Context.WIFI_SERVICE)).createWifiLock(WifiManager.WIFI_MODE_FULL_HIGH_PERF, "tuba:quran"); wf.setReferenceCounted(false); wf.acquire(); } catch (Exception e) {}
        }
        return START_NOT_STICKY;
    }

    @Override
    public void onDestroy() {
        try { if (wl != null && wl.isHeld()) wl.release(); } catch (Exception e) {}
        try { if (wf != null && wf.isHeld()) wf.release(); } catch (Exception e) {}
        stopForeground(true);
        super.onDestroy();
    }
}
