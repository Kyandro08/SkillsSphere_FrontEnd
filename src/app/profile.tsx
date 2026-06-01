import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { supabase } from '@/lib/supabase';

export default function ProfileScreen() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("tb_users").select("*");
      if (data) setUsers(data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {users.map((user, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.label}>Username: {user.username}</Text>
          <Text style={styles.label}>Email: {user.email}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f0f0f3',
  },
  label: { fontSize: 14, marginBottom: 2 },
});
