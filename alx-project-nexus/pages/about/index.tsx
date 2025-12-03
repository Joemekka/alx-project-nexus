import Header from '@/components/layouts/Header';
import Nav from '@/components/layouts/Nav';

const About = () => {
  return (
    <Header>
      <Nav />

      <div className="h-full">
        <div className="h-full flex justify-center items-center">
          <h1 className="text-white">About</h1>
        </div>
      </div>
    </Header>
  );
};
export default About;
