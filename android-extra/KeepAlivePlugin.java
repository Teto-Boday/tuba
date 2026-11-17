package app.tuba.teto;

import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.webkit.WebView;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

// يخلّي التلاوة شغالة والشاشة مقفولة: خدمة في المقدمة + نمنع الـ WebView إنه يهدى لما التطبيق يختفي
@CapacitorPlugin(name = "KeepAlive")
public class KeepAlivePlugin extends Plugin {
    private boolean on = false;
    private final Handler h = new Handler(Looper.getMainLooper());
    private final Runnable keep = new Runnable() {
        @Override public void run() {
            if (!on) return;
            try {
                WebView v = getBridge().getWebView();
                v.dispatchWindowVisibilityChanged(View.VISIBLE);
                v.resumeTimers();
                v.onResume();
            } catch (Exception e) {}
            h.postDelayed(this, 1000);
        }
    };

    @PluginMethod
    public void start(PluginCall call) {
        Intent i = new Intent(getContext(), AudioKeepService.class);
        i.putExtra("title", call.getString("title", "طُوبَى"));
        i.putExtra("text", call.getString("text", "التلاوة شغالة"));
        try {
            if (Build.VERSION.SDK_INT >= 26) getContext().startForegroundService(i); else getContext().startService(i);
            on = true;
        } catch (Exception e) { call.reject(e.getMessage()); return; }
        call.resolve();
    }

    @PluginMethod
    public void stop(PluginCall call) {
        on = false; h.removeCallbacks(keep);
        try { getContext().stopService(new Intent(getContext(), AudioKeepService.class)); } catch (Exception e) {}
        call.resolve();
    }

    @Override protected void handleOnPause() { if (on) { h.removeCallbacks(keep); h.postDelayed(keep, 300); } }
    @Override protected void handleOnStop() { if (on) { h.removeCallbacks(keep); h.postDelayed(keep, 300); } }
    @Override protected void handleOnResume() { h.removeCallbacks(keep); }
}
