<template>
  <div style="max-width: 560px; margin: 40px auto;">
    <h1>Tasks</h1>

    <div style="display: flex; gap: 8px; margin-top: 16px;">
      <input
        v-model.trim="newTitle"
        type="text"
        placeholder="Add a task..."
        style="flex: 1; padding: 10px;"
        @keydown.enter="onAdd"
      />
      <button type="button" @click="onAdd" style="padding: 10px 14px;">
        Add
      </button>
    </div>

    <p v-if="hint" style="margin: 8px 0 0; color: #b00020;">
      {{ hint }}
    </p>

    <ul style="list-style: none; padding: 0; margin: 16px 0 0;">
      <li
        v-for="t in sortedTasks"
        :key="t.id"
        style="
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        "
      >
        <input type="checkbox" :checked="t.done" @change="toggleTask(t.id)" />

        <span
          :style="{
            textDecoration: t.done ? 'line-through' : 'none',
            opacity: t.done ? 0.6 : 1
          }"
        >
          {{ t.title }}
        </span>

        <button
          type="button"
          @click="removeTask(t.id)"
          style="margin-left: auto; padding: 6px 10px;"
        >
          Delete
        </button>
      </li>
    </ul>

    <div style="display: flex; gap: 10px; margin-top: 18px;">
      <button type="button" @click="logout" style="padding: 10px;">
        Logout
      </button>
      <button type="button" @click="clearAllTasks" style="padding: 10px;">
        Clear Tasks
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storage } from "@/utils/storage";
import { useTasks } from "@/composables/useTasks";

const router = useRouter();

// 登出：清狀態後回 login
function logout() {
  if (typeof storage.clearAll === "function") {
    storage.clearAll();
  } else {
    storage.clearToken();
    if (typeof storage.clearAuthUser === "function") storage.clearAuthUser();
  }
  router.push("/login");
}

// tasks 邏輯
const { sortedTasks, addTask, toggleTask, removeTask, clearAllTasks } = useTasks();

const newTitle = ref("");
const hint = ref("");

function onAdd() {
  hint.value = "";
  if (!newTitle.value.trim()) {
    hint.value = "請輸入任務內容";
    return;
  }
  addTask(newTitle.value);
  newTitle.value = "";
}
</script>
