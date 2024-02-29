<script lang="ts">
  import { Home, Projector, Wrench } from "lucide-svelte";
</script>
<div>
  <div class="hidden lg:flex lg:flex-col lg:w-72 lg:z-50 lg:fixed lg:inset-y-0">
    <div class="flex flex-col grow gap-y-5 px-6 pb-4 overflow-y-auto border-e border-foreground bg-background dark:border-foreground-dark dark:bg-background-dark">
      <div class="flex h-16 items-center shrink-0">
        <Projector />
        <h4 class="text-lg">vignettte</h4>
      </div>
      <nav class="flex flex-1 flex-col">
        <ul class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul class="-mx-2 space-y-1">
              <li>
                <!-- svelte-ignore a11y-invalid-attribute -->
                <!-- TODO -->
                <a class="flex gap-x-2" href="#">
                  <Home />
                  Dashboard
                </a>
              </li>
            </ul>
          </li>
          <li class="mt-auto">
            <!-- svelte-ignore a11y-invalid-attribute -->
            <!-- TODO -->
            <a class="flex gap-x-2" href="#">
              <Wrench />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <div class="ps-72">
    <main class="p-8">
      <slot />
    </main>
  </div>
</div>
