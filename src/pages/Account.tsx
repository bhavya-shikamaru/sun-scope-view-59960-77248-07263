import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

const Account = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Account</h1>
          <p className="text-muted-foreground">
            Manage your HelioView profile and preferences
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Authentication Coming Soon</CardTitle>
            <CardDescription>
              User accounts and personalization features are under development
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <p className="text-center text-muted-foreground max-w-md">
              Soon you'll be able to create an account to save favorite images, track your uploads, 
              and customize your HelioView experience.
            </p>
            <Button variant="outline" disabled>
              Sign Up for Early Access
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Account;
