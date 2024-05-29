<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const props = defineProps<WithClassAsProps>()

const { orientation, canScrollPrev, scrollPrev } = useCarousel()
</script>

<template>
  <Button :disabled="!canScrollPrev" :class="cn(
    'touch-manipu absolute h-8 w-8 rounded-full p-0',
    orientation === 'horizontal'
      ? 'left-0 lg:-left-4 top-1/2 -translate-y-1/2'
      : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
    props.class,
  )" variant="outline" @click="scrollPrev">
    <div
      class="skew absolute w-10 h-8 left-0 top-0 bg-[#F57F20] group-hover:bg-[#F57F20] z-0 flex items-center p-1 -skew-x-12">
      <Icon name="mdi:arrow-left" class=" font-bold text-2xl"></Icon>
    </div>

  </Button>
</template>
