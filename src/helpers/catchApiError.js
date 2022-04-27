import Swal from 'sweetalert2';

export const catchApiError = (body) => {
  return () => {
    Swal.fire(body.errors || 'Error', body.msg, 'error');
  };
};
