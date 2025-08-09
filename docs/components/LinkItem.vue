<script setup>
defineProps({
    href: String,
    title: String,
    subtit: String,
})
</script>

<template>
    <a href="{{ href }}" target="_blank">
        <div> {{ title }} 1111</div>
        <div> {{ subtit }} 2222</div>
    </a>
</template>