'use client'
import * as React from 'react'
import { GripVerticalIcon } from 'lucide-react'
import * as ResizablePrimitive from 'react-resizable-panels'
import { classNames } from '@/shared/lib/utils'
import styles from '../Resizable.module.scss'
const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={classNames(styles.group, className)}
      {...props}
    />
  )
}
const ResizablePanel = ({ ...props }: React.ComponentProps<typeof ResizablePrimitive.Panel>) => {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={classNames(styles.handle, className)}
      {...props}
    >
      {withHandle && (
        <div className={styles.handleGrip}>
          <GripVerticalIcon className={styles.handleIcon} />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}
export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
