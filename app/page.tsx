import { ChatWidget } from '@/components/chat-widget';
import { LandingPage } from '@/components/landing-page';
import { buildPageContext } from '@/lib/store-data';

export default function HomePage() {
  return (
    <>
      <LandingPage />
      <ChatWidget pageContext={buildPageContext()} />
    </>
  );
}
