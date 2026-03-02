import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Animated,
  Image,
  StatusBar,
  BackHandler,
  TouchableOpacity,
  View,
  useColorScheme,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  // 🌐 Use system theme
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const backgroundColor = isDark ? "#0F172A" : "#FFFFFF";
  const statusBarStyle = isDark ? "light-content" : "dark-content";

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  const [showSplash, setShowSplash] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  const webViewRef = useRef<WebView>(null);

  // 🎬 Splash Animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        setShowSplash(false);
      }, 1200);
    });
  }, []);

  // 🔙 Android Back Button Handling
  useEffect(() => {
    const backAction = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  // 🌐 SPLASH SCREEN
  if (showSplash) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={backgroundColor}
        />
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </SafeAreaView>
    );
  }

  // 🌐 MAIN WEBVIEW
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />

      <View style={{ flex: 1 }}>
        <WebView
          ref={webViewRef}
          source={{ uri: "https://onetapconnect.co.ke/dashboard" }}
          onNavigationStateChange={(navState) =>
            setCanGoBack(navState.canGoBack)
          }
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          pullToRefreshEnabled
          overScrollMode="always"
          sharedCookiesEnabled={true} // ✅ Persist cookies on device
          thirdPartyCookiesEnabled={true} // ✅ Needed for some login systems
          style={{ flex: 1 }}
        />

        {/* 🔄 Floating Refresh Button */}
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => webViewRef.current?.reload()}
          activeOpacity={0.8}
        >
          <Ionicons name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  refreshButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#2563EB",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});
