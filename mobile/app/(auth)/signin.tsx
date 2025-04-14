import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { useContext, useState } from "react";
import { router } from "expo-router";
import { API_URL } from "../../constants";
import AuthContext from "../../context/authContext";
import Toast from "react-native-toast-message";

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function SignInScreen() {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext not found");

  const { login } = authContext;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6 || password.length > 100) {
      newErrors.password = "Password must be between 6 and 100 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      Toast.show({
        type: "success",
        text2: "Logged In Successfully",
      });

      console.log(data);

      await login(data?.token, data?.user);
      router.replace("/(tabs)/(home)");
    } catch (err: unknown) {
      Toast.show({
        type: "error",
        text2: err instanceof Error ? err.message : "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Here</Text>

      <View>
        <Text style={styles.subtitle}>Welcome back you've</Text>
        <Text style={styles.subtitle}>missed</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) {
                setErrors({ ...errors, email: undefined });
              }
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) {
                setErrors({ ...errors, password: undefined });
              }
            }}
            secureTextEntry
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSignIn}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.link}>Don't have an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
    gap: "18",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2563EB",
  },
  subtitle: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    paddingHorizontal: 10,
    fontWeight: "800",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    textAlign: "center",
    marginTop: 20,
    fontWeight: "800",
  },
  forgotPassword: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "bold",
  },
});
