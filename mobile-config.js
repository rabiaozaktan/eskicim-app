App.accessRule('*', { type: 'navigation' });
App.accessRule('*', { type: 'network' });
App.accessRule('*');

App.info({
  id: 'com.eskicim.app',
  name: 'Eskicim',
  description: '',
  author: 'Rabia Ozaktan',
  email: 'rabiaozaktan35@gmail.com',
  website: 'https://eskicim.herokuapp.com/',
  version: "0.0.1"
});

App.appendToConfig(`
    <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application" xmlns:android="http://schemas.android.com/apk/res/android">
        <application android:usesCleartextTraffic="true"></application>
    </edit-config>
`);

App.setPreference('Orientation', 'portrait');
App.setPreference('StatusBarBackgroundColor', '#731b95');

App.icons({
  'android_mdpi': 'public/assets/mobile/android/icon/drawable-mdpi/ic_launcher.png',
  'android_hdpi': 'public/assets/mobile/android/icon/drawable-hdpi/ic_launcher.png',
  'android_xhdpi': 'public/assets/mobile/android/icon/drawable-xhdpi/ic_launcher.png',
  'android_xxhdpi': 'public/assets/mobile/android/icon/drawable-xxhdpi/ic_launcher.png',
  'android_xxxhdpi': 'public/assets/mobile/android/icon/drawable-xxxhdpi/ic_launcher.png'
});

App.launchScreens({
  'android_mdpi_portrait': 'public/assets/mobile/android/splash/drawable-mdpi/splash.png',
  'android_hdpi_portrait': 'public/assets/mobile/android/splash/drawable-hdpi/splash.png',
  'android_xhdpi_portrait': 'public/assets/mobile/android/splash/drawable-xhdpi/splash.png',
  'android_xxhdpi_portrait': 'public/assets/mobile/android/splash/drawable-xxhdpi/splash.png',
  'android_xxxhdpi_portrait': 'public/assets/mobile/android/splash/drawable-xxxhdpi/splash.png',
});