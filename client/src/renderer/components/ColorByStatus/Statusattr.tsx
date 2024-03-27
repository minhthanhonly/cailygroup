import React from 'react';

const Statusattr = (status) => {
    switch (status) {
      case '承認済み':
        return '#038803'; // Màu xanh cho trạng thái '承認待ち'
      default:
        return '#FF0000'; // Màu mặc định
    }
}

export default Statusattr;