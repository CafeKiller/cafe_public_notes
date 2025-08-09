<script setup>
import { ref } from 'vue'
import { data as notes } from './notes.cp.data'

const list = ref([])

list.value = [...new Map(
    notes.map(note => [
      note.frontmatter.subcategory, 
      {
        subtit: note.frontmatter.subcategory,
        level: note.frontmatter.level || 99,
      }
    ])
  ).values()]
  .sort((noteBef, noteAft) => noteBef.level - noteAft.level)

  // console.log(notes)

const filterNotes = (subtit) => {
  return notes.filter(note => note.frontmatter.subcategory === subtit)
}
</script>


<template>
  <div class="list-wrapper">
    <div class="list">
      <div class="item" v-for="(item, idx) in list" :key="idx">
        <div class="tit">{{ item.subtit }}</div>
        <div class="notes-list">
          <a class="note-item" :href="note.url"
          v-for="(note, idx) in filterNotes(item.subtit)"
          :key="idx">
            {{ note.frontmatter.title ? note.frontmatter.title : "NONE" }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-wrapper {
  position: relative;
  --color: #8b4513;
}
.list-wrapper .item {
  position: relative;
  padding: 0 0 40px;
  display: flex;
}
.list-wrapper .item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 181px;
  width: 2px;
  height: 100%;
  background-color: var(--vp-c-neutral);
  opacity: 0.3;
}
.list-wrapper .item .tit {
  position: sticky;
  top: var(--vp-nav-height);
  left: 0;
  padding-right: 20px;
  width: 180px;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  text-align: right;
}

.list-wrapper .item .tit::before {
  content: '';
  position: absolute;
  top: 50%;
  right: -6px;
  width: 8px;
  height: 8px;
  transform: translateY(-50%) rotateZ(45deg);
  background-color: var(--vp-c-neutral);
  opacity: 0.7;
}

.list-wrapper .item .notes-list {
  padding-left: 32px;
  margin: 0;
}

.list-wrapper .item .notes-list .note-item {
  list-style: none;
  display: flex;
  font-size: 16px;
  line-height: 40px;
  color: var(--color);
  text-decoration: none;
}

@media screen and (max-width: 720px) {
  .list-wrapper .item {
    display: block;
  }
  .list-wrapper .item::before {
    display: none;
  }
  .list-wrapper .item .tit {
    top: 0;
    text-align: left;
    width: 100%;
    font-size: 20px;
    background-color: var(--vp-c-bg);
  }
  .list-wrapper .item .tit::before {
    display: none;
  }
  .list-wrapper .item .notes-list {
    padding-left: 16px;
  }
  .list-wrapper .item .notes-list .note-item  {
    font-size: 14px;
  }
}
</style>