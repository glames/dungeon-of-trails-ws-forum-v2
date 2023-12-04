import empty from '~/assets/images/no-data-found.png';

const NoData = () => {
  return (
    <div
      style={{ background: 'none', padding: '10px 0px', textAlign: 'center' }}
    >
      <img style={{ width: '220px' }} src={empty} />
    </div>
  );
};

export default NoData;
