import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
// import { emailValidator } from '../helpers/emailValidator'
import { usernameValidator } from '../helpers/usernameValidator'
import { passwordValidator } from '../helpers/passwordValidator'

export default function LoginScreen({ navigation }) {
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [username, setUsername] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const usernameError = usernameValidator(username.value)
    const passwordError = passwordValidator(password.value)
    // if (!username.value && !password.value) {
    //     navigation.reset({
    //         index: 0,
    //         routes: [{ name: 'Dashboard' }],
    //     })
    //     return
    // }
    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError })
      setPassword({ ...password, error: passwordError })
      return
    }
    if (username.value !== 'hoainiem' || password.value !== 'hoainiem') {
      setUsername({ ...username, error: ' ' })
      setPassword({ ...password, error: 'Wrong username or password' })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none" // giữ nguyên, để username không viết hoa chữ cái đầu
        autoComplete="username" // ✅ đổi từ email → username (RN >= 0.63)
        textContentType="username" // ✅ đổi từ emailAddress → username
        keyboardType="default" // ✅ đổi từ email-address → default
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
