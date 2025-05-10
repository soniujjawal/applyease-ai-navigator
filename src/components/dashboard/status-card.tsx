
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface StatusCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  linkTo?: string;
  linkText?: string;
}

export function StatusCard({
  title,
  value,
  description,
  icon,
  linkTo,
  linkText,
}: StatusCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardHeader className={`flex flex-row items-center justify-between pb-2 ${icon ? 'space-y-0' : ''}`}>
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </div>
        {icon}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-2xl font-bold">{value}</div>
        {linkTo && (
          <Link
            to={linkTo}
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            {linkText || "View details"}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
