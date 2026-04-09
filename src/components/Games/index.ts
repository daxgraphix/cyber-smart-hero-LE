import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const ChooseYourResponse = lazy(() => 
  import('./ChooseYourResponse').then(m => ({ default: m.ChooseYourResponse }))
);

export const MatchThePairs = lazy(() => 
  import('./MatchThePairs').then(m => ({ default: m.MatchThePairs }))
);

export const PasswordChecker = lazy(() => 
  import('./PasswordChecker').then(m => ({ default: m.PasswordChecker }))
);

export const DragAndDrop = lazy(() => 
  import('./DragAndDrop').then(m => ({ default: m.DragAndDrop }))
);

export const SpotThePhish = lazy(() => 
  import('./SpotThePhish').then(m => ({ default: m.SpotThePhish }))
);

export const SpotTheAd = lazy(() => 
  import('./SpotTheAd').then(m => ({ default: m.SpotTheAd }))
);

export const Sorting = lazy(() => 
  import('./Sorting').then(m => ({ default: m.Sorting }))
);

export const CodeBreaker = lazy(() => 
  import('./CodeBreaker').then(m => ({ default: m.CodeBreaker }))
);

export function GameLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
    </div>
  );
}
