import Map, { CoordsType } from '../map';
import LoadingSpinner from './LoadingSpinner';
import Workouts from '../workouts';
import Copyright from '../footer/Copyright';
import NotItem from './NotItem';
import logo from '../../assets/logo.png';

interface LayoutProps {
  isLoading: boolean;
  coords: CoordsType | null;
}
function Layout({ isLoading, coords }: LayoutProps) {
  return (
    <>
      <div className="sidebar">
        <img className="logo" src={logo} alt="Logo" />
        {isLoading ? <LoadingSpinner /> : <Workouts />}
        <Copyright />
      </div>
      {coords !== null ? <Map coords={coords} /> : <NotItem message="No Map" />}
    </>
  );
}

export default Layout;
