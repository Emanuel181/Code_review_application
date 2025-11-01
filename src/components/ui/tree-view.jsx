'use client';

import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const TreeContext = React.createContext({
  selectedId: undefined,
  expandedItems: [],
  onSelectChange: () => {},
  toggleExpand: () => {},
});

export function Tree({
  data,
  initialSelectedItemId,
  onSelectChange,
  expandAll = false,
  expandedItemIds,
  onExpandedChange,
  defaultNodeIcon,
  defaultLeafIcon,
  className,
  ...props
}) {
  const [selectedId, setSelectedId] = React.useState(initialSelectedItemId);
  const [internalExpandedItems, setInternalExpandedItems] = React.useState(() => {
    if (expandAll) {
      const getAllIds = (items) => {
        let ids = [];
        const traverse = (item) => {
          if (item.children && item.children.length > 0) {
            ids.push(item.id);
            item.children.forEach(traverse);
          }
        };
        (Array.isArray(items) ? items : [items]).forEach(traverse);
        return ids;
      };
      return getAllIds(data);
    }
    return [];
  });

  // Use controlled state if provided, otherwise use internal state
  const expandedItems = expandedItemIds !== undefined ? expandedItemIds : internalExpandedItems;

  const handleSelectChange = React.useCallback((item) => {
    setSelectedId(item?.id);
    onSelectChange?.(item);
  }, [onSelectChange]);

  const toggleExpand = React.useCallback((itemId) => {
    const newExpandedItems = expandedItems.includes(itemId)
      ? expandedItems.filter((id) => id !== itemId)
      : [...expandedItems, itemId];

    if (onExpandedChange) {
      // Controlled mode
      onExpandedChange(newExpandedItems);
    } else {
      // Uncontrolled mode
      setInternalExpandedItems(newExpandedItems);
    }
  }, [expandedItems, onExpandedChange]);

  return (
    <TreeContext.Provider
      value={{
        selectedId,
        expandedItems,
        onSelectChange: handleSelectChange,
        toggleExpand,
        defaultNodeIcon,
        defaultLeafIcon,
      }}
    >
      <div className={cn('relative overflow-hidden', className)} {...props}>
        {Array.isArray(data) ? (
          data.map((item) => <TreeItem key={item.id} item={item} level={0} />)
        ) : (
          <TreeItem item={data} level={0} />
        )}
      </div>
    </TreeContext.Provider>
  );
}

function TreeItem({ item, level }) {
  const {
    selectedId,
    expandedItems,
    onSelectChange,
    toggleExpand,
    defaultNodeIcon,
    defaultLeafIcon,
  } = React.useContext(TreeContext);

  const [isDragOver, setIsDragOver] = React.useState(false);

  const isExpanded = expandedItems.includes(item.id);
  const isSelected = selectedId === item.id;
  const hasChildren = item.children && item.children.length > 0;

  const Icon = hasChildren
    ? item.icon || item.openIcon || defaultNodeIcon
    : item.icon || defaultLeafIcon;

  const handleClick = () => {
    if (item.disabled) return;

    if (item.onClick) {
      item.onClick();
    }
    onSelectChange(item);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    if (hasChildren && !item.disabled) {
      toggleExpand(item.id);
    }
  };

  const handleDragOver = (e) => {
    if (item.onDragOver) {
      item.onDragOver(e);
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    if (item.onDragLeave) {
      item.onDragLeave(e);
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    if (item.onDrop) {
      item.onDrop(e);
      setIsDragOver(false);
    }
  };

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-1 rounded-md py-2 px-2 text-sm cursor-pointer hover:bg-accent transition-colors',
          isSelected && 'bg-accent',
          item.disabled && 'opacity-50 cursor-not-allowed',
          isDragOver && item.droppable && 'bg-primary/20 border-2 border-primary border-dashed',
          item.draggable && 'cursor-move'
        )}
        style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
        onClick={handleClick}
        draggable={item.draggable}
        onDragStart={item.onDragStart}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {hasChildren ? (
          <button
            onClick={handleToggle}
            className="p-0.5 hover:bg-accent-foreground/10 rounded"
            disabled={item.disabled}
          >
            <ChevronRight
              className={cn(
                'h-4 w-4 transition-transform',
                isExpanded && 'rotate-90'
              )}
            />
          </button>
        ) : (
          <span className="w-5" />
        )}
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        <span className="flex-1 truncate">{item.name}</span>
        {item.actions && (
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            {item.actions}
          </div>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div>
          {item.children.map((child) => (
            <TreeItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

