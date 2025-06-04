import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function UnauthorizedPage() {
  return (
    <Alert className="max-w-xl">
      <AlertTitle>Non autorisé</AlertTitle>
      <AlertDescription>Il faut être connecté pour accéder à cette page</AlertDescription>
    </Alert>
  )
}
