SwalUtil = {
  deleteAreYouSure: {
    title: "Emin misin?",
    text: 'Kayıt silinecek.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'var(--bs-danger)',
    cancelButtonColor: 'var(--bs-warning)',
    cancelButtonText: Translate('globals.no'),
    confirmButtonText: Translate('globals.yes')
  },
  confirmAreYouSure: {
    title: "Emin misin?",
    text: 'Onaylandıktan sonra sadece admin düzenleme yapabilir.',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: 'var(--bs-danger)',
    cancelButtonColor: 'var(--bs-warning)',
    cancelButtonText: Translate('globals.no'),
    confirmButtonText: Translate('globals.yes')
  },
  update: {
    title: Translate('globals.swal', 'successful'),
    text: 'Kayıt güncellendi.',
    icon: 'success',
    confirmButtonText: Translate('globals', 'ok')
  },
  add: {
    title: Translate('globals.swal', 'successful'),
    text: 'Kayıt eklendi.',
    icon: 'success',
    confirmButtonText: Translate('globals', 'ok')
  },
  validValue: function (field) {
    return {
      title: "Girilen değer geçersiz",
      text: `Lütfen bir ${field} giriniz.`,
      icon: 'warning',
      confirmButtonText: Translate('globals', 'ok')
    }
  },
}