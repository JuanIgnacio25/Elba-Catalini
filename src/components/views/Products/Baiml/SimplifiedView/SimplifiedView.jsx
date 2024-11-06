import './simplifiedView.css';
import PathHeader from '@/components/common/PathHeader/PathHeader';
import SimplifiedViewCategories from '@/components/views/Products/Baiml/SimplifiedView/SimplifiedViewCategories';
import SimplifiedViewCards from '@/components/views/Products/Baiml/SimplifiedView/SimplifiedViewCards';

function SimplifiedView() {
  return (
    <div className='simplified-view-container'>
      <PathHeader/>
      <div className='simplified-view'>
        <SimplifiedViewCategories/>
        <SimplifiedViewCards/>
      </div>
    </div>
  )
}

export default SimplifiedView