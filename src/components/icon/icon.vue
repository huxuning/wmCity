<template>
    <i :class="['icon-' + name]" @click="$emit('click', $event)" />
  </template>
  
  <script>
  export default {
    name: 'icon',
    props: {
      name: {
        type: String,
        required: true
      }
    }
  }
  </script>