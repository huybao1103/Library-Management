package com.example.librarydemo.Activity.Books.BookAuthor;

import android.annotation.SuppressLint;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.Fragment;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;

import com.example.librarydemo.databinding.FragmentAuthorEditFormBinding;

/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 */
public class AuthorEditForm extends DialogFragment {
//    /**
//     * Whether or not the system UI should be auto-hidden after
//     * {@link #AUTO_HIDE_DELAY_MILLIS} milliseconds.
//     */
//    private static final boolean AUTO_HIDE = false;
//
//    /**
//     * If {@link #AUTO_HIDE} is set, the number of milliseconds to wait after
//     * user interaction before hiding the system UI.
//     */
//    private static final int AUTO_HIDE_DELAY_MILLIS = 3000;
//
//    /**
//     * Some older devices needs a small delay between UI widget updates
//     * and a change of the status and navigation bar.
//     */
//    private static final int UI_ANIMATION_DELAY = 300;
//    private final Handler mHideHandler = new Handler(Looper.myLooper());
//    private final Runnable mHidePart2Runnable = new Runnable() {
//        @SuppressLint("InlinedApi")
//        @Override
//        public void run() {
//            // Delayed removal of status and navigation bar
//
//            // Note that some of these constants are new as of API 16 (Jelly Bean)
//            // and API 19 (KitKat). It is safe to use them, as they are inlined
//            // at compile-time and do nothing on earlier devices.
//            int flags = View.SYSTEM_UI_FLAG_LOW_PROFILE
//                    | View.SYSTEM_UI_FLAG_FULLSCREEN
//                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
//                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
//                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
//                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION;
//
//            Activity activity = getActivity();
//            if (activity != null
//                    && activity.getWindow() != null) {
//                activity.getWindow().getDecorView().setSystemUiVisibility(flags);
//            }
//            ActionBar actionBar = getSupportActionBar();
//            if (actionBar != null) {
//                actionBar.hide();
//            }
//
//        }
//    };
//    private View mContentView;
//    private View mControlsView;
//    private final Runnable mShowPart2Runnable = new Runnable() {
//        @Override
//        public void run() {
//            // Delayed display of UI elements
//            ActionBar actionBar = getSupportActionBar();
//            if (actionBar != null) {
//                actionBar.show();
//            }
//            mControlsView.setVisibility(View.VISIBLE);
//        }
//    };
//
//    private FragmentAuthorEditFormBinding binding;
//
//    @Nullable
//    @Override
//    public View onCreateView(@NonNull LayoutInflater inflater,
//                             @Nullable ViewGroup container,
//                             @Nullable Bundle savedInstanceState) {
//
//        binding = FragmentAuthorEditFormBinding.inflate(inflater, container, false);
//        return binding.getRoot();
//
//    }
//
//    @Override
//    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
//        super.onViewCreated(view, savedInstanceState);
//    }
//
//    @Override
//    public void onResume() {
//        super.onResume();
//        if (getActivity() != null && getActivity().getWindow() != null) {
//            getActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
//        }
//    }
//
//    @Override
//    public void onPause() {
//        super.onPause();
//        if (getActivity() != null && getActivity().getWindow() != null) {
//            getActivity().getWindow().clearFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
//
//            // Clear the systemUiVisibility flag
//            getActivity().getWindow().getDecorView().setSystemUiVisibility(0);
//        }
//    }
//
//    @Override
//    public void onDestroy() {
//        super.onDestroy();
//        mContentView = null;
//        mControlsView = null;
//    }
//
//    @Nullable
//    private ActionBar getSupportActionBar() {
//        ActionBar actionBar = null;
//        if (getActivity() instanceof AppCompatActivity) {
//            AppCompatActivity activity = (AppCompatActivity) getActivity();
//            actionBar = activity.getSupportActionBar();
//        }
//        return actionBar;
//    }
//
//    @Override
//    public void onDestroyView() {
//        super.onDestroyView();
//        binding = null;
//    }
}