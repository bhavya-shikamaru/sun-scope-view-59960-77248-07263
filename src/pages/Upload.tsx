import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload as UploadIcon } from "lucide-react";

const Upload = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Upload Image</h1>
          <p className="text-muted-foreground">
            Share your solar observations with the community
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
              Community upload feature is currently under development
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="h-24 w-24 rounded-full bg-accent/10 flex items-center justify-center">
              <UploadIcon className="h-12 w-12 text-accent" />
            </div>
            <p className="text-center text-muted-foreground max-w-md">
              We're working on a system that will allow amateur astronomers and educators to 
              contribute their solar observations. Stay tuned!
            </p>
            <Button variant="outline" disabled>
              Notify Me When Available
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;
