import './simplifiedView.css';
import PathHeader from '@/components/common/PathHeader/PathHeader';
import SimplifiedViewMain from '@/components/views/Products/Baiml/SimplifiedView/SimplifiedViewMain';

function SimplifiedView() {
  return (
    <div className='simplified-view-container'>
      <PathHeader/>
      <SimplifiedViewMain/>
    </div>
  )
}

export default SimplifiedView