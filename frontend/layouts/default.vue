<template>
  <div class="hidden lg:flex lg:flex-col lg:w-72 lg:z-50 lg:fixed lg:inset-y-0">
    <div
      class="flex flex-col grow overflow-y-auto border-e border-border bg-background dark:border-border-dark dark:bg-background-dark"
    >
      <div
        class="flex p-4 gap-x-3 items-center shrink-0 pointer-events-none select-none border-b border-border dark:border-border-dark"
      >
        <Icon name="fluent:movies-and-tv-24-filled" class="w-8 h-8" />
        <h4 class="text-lg font-mono font-semibold tracking-tighter">
          vigne<span class="tracking-[-0.2em]">tt</span>te
        </h4>
      </div>
      <!-- Nav -->
      <nav class="flex flex-1 flex-col">
        <ul class="flex flex-1 flex-col gap-y-7">
          <!-- Header-adjacent -->
          <li>
            <ul class="space-y-1">
              <li class="group relative px-4 py-5 hover:bg-emphasis hover:dark:bg-emphasis-dark">
                <a class="flex after:absolute after:inset-0 items-center gap-x-3" href="#">
                  <Icon name="fluent:home-12-regular" class="w-8 h-6" />
                  Dashboard
                </a>
              </li>
            </ul>
          </li>
          <!-- Footer -->
          <li class="mt-auto">
            <a class="group relative flex px-4 py-5 items-center gap-x-2 hover:bg-emphasis hover:dark:bg-emphasis-dark" href="#">
              <Icon name="fluent:settings-16-regular" class="w-8 h-6" />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <div class="ps-72 min-h-full">
    <main class="p-8">
      <slot />
    </main>
  </div>
</template>
