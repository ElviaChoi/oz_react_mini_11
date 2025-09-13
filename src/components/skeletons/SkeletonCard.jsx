import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard = () => {
  return (
    <SkeletonTheme baseColor="#2a3a5a" highlightColor="#3a4a6a">
      <div className='bg-white/5 p-3 rounded-2xl w-full sm:w-[240px] md:w-[260px] lg:w-[280px]'>
        <Skeleton height={340} className="rounded-xl" />
        <div className="mt-4 flex justify-between items-center">
          <Skeleton count={1} height={24} width={`70%`} />
          <Skeleton count={1} height={36} width={`25%`} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonCard;
