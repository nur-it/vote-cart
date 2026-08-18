async function test() {
  const payload = {
    sectionId: 'cmsruvexp0000twvb6qgadha2',
    name: 'Медовик Классический',
    description: 'Традиционный русский медовый торт с нежным кремом',
    emoji: '🎂',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'
  };

  console.log("1. Testing POST (Create Russian Product with Auto-translation to English)...");
  const res = await fetch('http://localhost:3000/api/poll/option?lang=en', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-guest-id': 'guest_test_abc' },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log("Create response option:", JSON.stringify(data.option, null, 2));

  if (!data.option?.id) {
    console.error("Failed to create option:", data);
    return;
  }

  const optionId = data.option.id;

  console.log("\n2. Testing PUT (Edit Product)...");
  const editRes = await fetch('http://localhost:3000/api/poll/option?lang=ru', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-guest-id': 'guest_test_abc' },
    body: JSON.stringify({
      optionId,
      name: 'Медовик Премиум',
      description: 'Обновленный рецепт торта с грецкими орехами',
      emoji: '🍰'
    })
  });
  const editData = await editRes.json();
  console.log("Edit response option:", JSON.stringify(editData.option, null, 2));

  console.log("\n3. Testing DELETE (Delete Product)...");
  const deleteRes = await fetch('http://localhost:3000/api/poll/option?lang=en', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'x-guest-id': 'guest_test_abc' },
    body: JSON.stringify({ optionId })
  });
  const deleteData = await deleteRes.json();
  console.log("Delete response:", JSON.stringify(deleteData, null, 2));
}

test().catch(console.error);
