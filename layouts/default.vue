<template>
  <div class="bg-primary bg-opacity-10 poppins-regular">
    <div class="container mx-auto max-w-[1440px] bg-white p-0">
      <Header></Header>
      <slot />
      <Footer></Footer>
      <ToasterAlert></ToasterAlert>
      <Toaster />
    </div>
  </div>
</template>