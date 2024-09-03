import Swal, { type SweetAlertOptions } from "sweetalert2";

export const useAlert = () => {
  return (obj: SweetAlertOptions) => {
    Swal.fire({
      text: "Do you want to continue",
      icon: "success",
      iconColor: '#f85606',
      confirmButtonText: "Okay",
      confirmButtonColor: '#f85606',
      // backdrop: '#ffffff80',
      // animation: false,
      ...obj,
    }).then((result) => {
      if (result.isConfirmed) {
        return result;
      }
      return Promise.reject(result);
    });
  };
};

export const useConfirmation = () => {
  return (obj: SweetAlertOptions) => {
    return Swal.fire({
      position: "top",
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
      cancelButtonText: "No",
      // animation: false,
      ...obj,
    }).then((result) => {
      if (result.isConfirmed) {
        return result;
      }
      return Promise.reject(result);
    });
  };
};
