<script setup>
import { ref } from 'vue'
import { useData } from 'vitepress'
// import { all } from '../.vitepress/utils/PressUtil'

const { page, frontmatter, site, params  } = useData()
const count = ref(0)

// console.log(all)

</script>

<template>
    <h2>Markdown 计算</h2>

    The count is: {{ count }}

    <button :class="$style.button" @click="count++">Increment</button>

    <pre>
        {{ page }}
    </pre>
</template>

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>