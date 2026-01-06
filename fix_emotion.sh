#!/bin/bash
# Backup
cp src/pages/NewCase.jsx src/pages/NewCase.jsx.temp

# Find and replace the entire emotion section
awk '
/Select emotions you.re experiencing/ {
    print "                    <div className=\"space-y-3\">"
    print "                      <label className=\"text-sm font-medium\">"
    print "                        How are you feeling? (optional)"
    print "                      </label>"
    print "                      <input"
    print "                        type=\"text\""
    print "                        placeholder=\"e.g., frustrated, sad, confused, hopeful...\""
    print "                        className=\"w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500\""
    print "                        onChange={(e) => setEmotions(e.target.value)}"
    print "                      />"
    print "                      <p className=\"text-xs text-gray-500\">"
    print "                        Helps us understand your emotional state"
    print "                      </p>"
    print "                    </div>"
    # Skip the old content until the help text
    while (getline && !/This helps our experts understand/) {}
    next
}
{ print }
' src/pages/NewCase.jsx.temp > src/pages/NewCase.jsx

rm src/pages/NewCase.jsx.temp
echo "✅ Emotion section updated"
