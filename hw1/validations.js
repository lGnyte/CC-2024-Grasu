export const validateNewCustomer = (customer) => {
  return customer.name 
  && customer.email 
  && customer.address?.street 
  && customer.address?.city
  && customer.address?.zip
  && customer.address?.state;
}

export const validateNewProduct = (product) => {
  return product.name 
  && product.price 
  && product.description
  && product.category;
}

export const validateEditCustomer = (customer) => {
  let ok = true;
  Object.keys(customer).forEach(key => {
    if(key === 'id' || ['name', 'email', 'address'].indexOf(key) === -1) {
      ok = false;
    }
  });
  return ok;
}

export const validateEditProduct = (product) => {
  let ok = true;
  Object.keys(product).forEach(key => {
    if(key === 'id' || ['name', 'price', 'description', 'category'].indexOf(key) < 0) {
      ok = false;
    }
  });
  return ok;
}