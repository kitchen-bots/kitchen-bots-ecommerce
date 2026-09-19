import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { 
  Package, ShoppingBag, HeadphonesIcon, 
  Settings, Users, Plus, LayoutDashboard
} from 'lucide-react';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { userService } from '../services/userService';
import { ticketService } from '../services/ticketService';

interface CommandSearchProps {
  onNavigate: (route: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandSearch({ onNavigate, open, setOpen }: CommandSearchProps) {
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  const handleSelect = (callback: () => void) => {
    setOpen(false);
    callback();
  };

  // Get search results
  const products = search.length > 1 ? productService.search(search).slice(0, 5) : [];
  const orders = search.length > 1 ? orderService.search(search).slice(0, 5) : [];
  const users = search.length > 1 ? userService.search(search).slice(0, 5) : [];
  const tickets = search.length > 1 ? ticketService.search(search).slice(0, 5) : [];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="Type a command or search..." 
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => handleSelect(() => onNavigate('overview'))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard Overview</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => onNavigate('products'))}>
            <Package className="mr-2 h-4 w-4" />
            <span>Inventory Management</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => onNavigate('orders'))}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Order History</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => handleSelect(() => { /* TODO: Trigger New Product Modal */ })}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Create New Product</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => onNavigate('settings'))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>System Settings</span>
          </CommandItem>
        </CommandGroup>

        {products.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Products">
              {products.map(p => (
                <CommandItem key={p.id} onSelect={() => handleSelect(() => onNavigate('products'))}>
                  <Package className="mr-2 h-4 w-4" />
                  <span>{p.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{p.sku}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {orders.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Orders">
              {orders.map(o => (
                <CommandItem key={o.id} onSelect={() => handleSelect(() => onNavigate('orders'))}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>{o.id} - {o.customerName}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{o.total}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {users.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Users">
              {users.map(u => (
                <CommandItem key={u.id} onSelect={() => handleSelect(() => onNavigate('users'))}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>{u.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{u.email}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {tickets.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Service Tickets">
              {tickets.map(t => (
                <CommandItem key={t.id} onSelect={() => handleSelect(() => onNavigate('services'))}>
                  <HeadphonesIcon className="mr-2 h-4 w-4" />
                  <span>{t.id} - {t.subject}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{t.status}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
