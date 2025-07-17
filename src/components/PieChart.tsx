import React, { useEffect, useState } from 'react';
import { Modal } from '@radix-ui/react-dialog';
import { supabase } from '../supabaseClient';

type Entry = { hour: number; activity: string };

export default function PieChart() {
  const [entries, setEntries] = useState<Record<number, string>>({});
  const [modalHour, setModalHour] = useState<number | null>(null);
  const [draft, setDraft] = useState('');

  // Fetch today’s entries
  useEffect(() => {
    const load = async () => {
      const today = new Date().toISOString().slice(0,10);
      const { data } = await supabase
        .from('pie_chart_entries')
        .select('hour,activity')
        .eq('date', today);
      if (data) {
        const map: Record<number,string> = {};
        data.forEach((e: any) => (map[e.hour] = e.activity));
        setEntries(map);
      }
    };
    load();
  }, []);

  // Save a single entry
  const saveEntry = async () => {
    if (modalHour === null) return;
    const today = new Date().toISOString().slice(0,10);
    await supabase
      .from('pie_chart_entries')
      .upsert({
        user_id: supabase.auth.user()?.id,
        date: today,
        hour: modalHour,
        activity: draft,
      });
    setEntries((e) => ({ ...e, [modalHour]: draft }));
    setModalHour(null);
  };

  return (
    <div className="relative w-64 h-64">
      {/* Pie chart circle */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * 2 * Math.PI;
          const x = 50 + 45 * Math.cos(angle);
          const y = 50 + 45 * Math.sin(angle);
          return (
            <g key={i} onClick={() => { setModalHour(i); setDraft(entries[i] || ''); }}>
              <path
                d={`M50,50 L${50 + 45 * Math.cos((i/24)*2*Math.PI)} ${50 + 45 * Math.sin((i/24)*2*Math.PI)}
                    A45,45 0 ${i < 12 ? 0 : 1},1 ${50 + 45 * Math.cos(((i+1)/24)*2*Math.PI)} ${50 + 45 * Math.sin(((i+1)/24)*2*Math.PI)} Z`}
                className="fill-gray-200 hover:fill-gray-300 cursor-pointer transition-colors"
              />
            </g>
          );
        })}
      </svg>

      {/* Modal for editing */}
      {modalHour !== null && (
        <Modal open onOpenChange={() => setModalHour(null)}>
          <Modal.Overlay className="fixed inset-0 bg-black/50" />
          <Modal.Content className="fixed top-1/3 left-1/2 -translate-x-1/2 p-4 bg-white rounded shadow-lg">
            <h2 className="mb-2 font-semibold">Hour {modalHour}:00</h2>
            <textarea
              rows={3}
              className="w-full p-2 border rounded"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button
              className="mt-2 px-4 py-2 bg-primary text-white rounded"
              onClick={saveEntry}
            >
              Save
            </button>
          </Modal.Content>
        </Modal>
      )}
    </div>
  );
}
