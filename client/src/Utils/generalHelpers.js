export const formatAddress = (address) => {
  if (address) {
    let addressData = [];
    ['street', 'city', 'country', 'zip'].forEach((item) => {
      const value = address[item];
      if (value) {
        const trimValue = value.trim();
        if (trimValue.length > 0) {
          addressData.push(trimValue);
        }
      }
    });
    if (addressData.length > 0) {
      return addressData.join(', ');
    }
  }
  return '--';
};

export const formatOrderData = (item) => {
  return {
    id: item.id,
    ...item.data(),
  };
};

export const formatTitle = (title) => {
  if (title) {
    const trimValue = title.trim();
    if (trimValue.length > 0) {
      return trimValue;
    }
  }
  return '--';
};

export const formatCustomer = (customer) => {
  if (customer) {
    return formatTitle(customer.name);
  }
  return '--';
};

export const formatBookingDate = (bookingDate) => {
  if (bookingDate) {
    const dateObject = new Date(Number(bookingDate));
    const isValid = dateObject.getTime() > 0;

    if (isValid) {
      return dateObject.toDateString();
    }
  }
  return '--';
};
