import ChatComponent from './ChatComponent';
import Footer from './Footer';
import Header from './Header';

function MainSection() {
  return (
    <div className="flex flex-col gap-2 h-full w-full pb-2">
      <Header />
      <ChatComponent />
      <Footer />

    </div>
  )
}

export default MainSection