import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginUser, registerUser } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ChevronLeft } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "fr";
  const isEnglish = lang === "en";
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Traductions
  const t = {
    back: isEnglish ? "Back" : "Retour",
    title: isEnglish ? "Versailles Horse Riding" : "Versailles à Cheval",
    subtitle: isEnglish ? "Sign in or create an account" : "Connectez-vous ou créez un compte",
    login: isEnglish ? "Sign In" : "Connexion",
    register: isEnglish ? "Sign Up" : "Inscription",
    email: isEnglish ? "Email" : "Email",
    password: isEnglish ? "Password" : "Mot de passe",
    firstName: isEnglish ? "First Name" : "Prénom",
    lastName: isEnglish ? "Last Name" : "Nom",
    confirmPassword: isEnglish ? "Confirm Password" : "Confirmer le mot de passe",
    signInButton: isEnglish ? "Sign In" : "Se connecter",
    signUpButton: isEnglish ? "Create Account" : "Créer mon compte",
    loggingIn: isEnglish ? "Signing in..." : "Connexion...",
    signingUp: isEnglish ? "Creating account..." : "Inscription...",
    invalidCredentials: isEnglish ? "Invalid email or password" : "Email ou mot de passe incorrect",
    passwordMismatch: isEnglish ? "Passwords do not match" : "Les mots de passe ne correspondent pas",
    passwordLength: isEnglish ? "Password must be at least 6 characters" : "Le mot de passe doit contenir au moins 6 caractères",
    registerError: isEnglish ? "Error creating account. This email may already be in use." : "Erreur lors de l'inscription. Cet email est peut-être déjà utilisé.",
    successMsg: isEnglish 
      ? "Account created successfully! A verification email has been sent. Please check your inbox before signing in."
      : "Compte créé avec succès ! Un email de vérification vous a été envoyé. Veuillez vérifier votre boîte de réception avant de vous connecter.",
    placeholderFirstName: isEnglish ? "John" : "Jean",
    placeholderLastName: isEnglish ? "Smith" : "Dupont",
    placeholderEmail: isEnglish ? "your@email.com" : "votre@email.com",
  };
  
  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register form
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await loginUser(loginEmail, loginPassword);

      if (user) {
        if (loginEmail === "parisdreamhunt@gmail.com") {
          navigate("/admin");
        } else {
          navigate(`/?lang=${lang}`);
        }
      } else {
        setError(t.invalidCredentials);
      }
    } catch (err) {
      setError(t.invalidCredentials);
    }

    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (registerPassword !== confirmPassword) {
      setError(t.passwordMismatch);
      setIsLoading(false);
      return;
    }

    if (registerPassword.length < 6) {
      setError(t.passwordLength);
      setIsLoading(false);
      return;
    }

    try {
      const user = await registerUser(registerEmail, registerPassword);

      if (user) {
        setSuccessMessage(t.successMsg);
        setRegisterEmail("");
        setRegisterPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
      } else {
        setError(t.registerError);
      }
    } catch (err) {
      setError(t.registerError);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F3F0EB] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate(`/?lang=${lang}`)}
          className="mb-6 -ml-4"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {t.back}
        </Button>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">{t.title}</CardTitle>
            <CardDescription>{t.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">{t.login}</TabsTrigger>
                <TabsTrigger value="register">{t.register}</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t.email}</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder={t.placeholderEmail}
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t.password}</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#8C7B6B] hover:bg-[#6B5D4F] text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.loggingIn}
                      </>
                    ) : (
                      t.signInButton
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t.firstName}</Label>
                      <Input
                        id="firstName"
                        placeholder={t.placeholderFirstName}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t.lastName}</Label>
                      <Input
                        id="lastName"
                        placeholder={t.placeholderLastName}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">{t.email}</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder={t.placeholderEmail}
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">{t.password}</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t.confirmPassword}</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {successMessage && (
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm">
                      {successMessage}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#8C7B6B] hover:bg-[#6B5D4F] text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.signingUp}
                      </>
                    ) : (
                      t.signUpButton
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
