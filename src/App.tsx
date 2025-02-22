import React, { useState, useEffect } from 'react';
import { ArrowRight, Send, FileSearch, Plus, Pencil, Trash2, Code2 } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';

interface Endpoint {
  method: string;
  path: string;
  description: string;
  code: string;
}

function App() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<number>(0);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    if (showCode) {
      Prism.highlightAll();
    }
  }, [showCode, selectedEndpoint]);

  const endpoints: Endpoint[] = [
    {
      method: 'GET',
      path: '/api/users',
      description: 'Récupère la liste de tous les utilisateurs',
      code: `// Récupérer tous les utilisateurs
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(users => console.log(users))
  .catch(error => console.error('Erreur:', error));

// Avec async/await
async function getUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Erreur:', error);
  }
}`
    },
    {
      method: 'POST',
      path: '/api/users',
      description: 'Crée un nouvel utilisateur',
      code: `// Créer un nouvel utilisateur
const newUser = {
  name: 'John Doe',
  email: 'john@example.com'
};

fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newUser)
})
  .then(response => response.json())
  .then(user => console.log('Utilisateur créé:', user))
  .catch(error => console.error('Erreur:', error));`
    },
    {
      method: 'PUT',
      path: '/api/users/:id',
      description: 'Met à jour un utilisateur existant',
      code: `// Mettre à jour un utilisateur
const userId = '123';
const updates = {
  name: 'John Updated',
  email: 'john.updated@example.com'
};

fetch(\`https://api.example.com/users/\${userId}\`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updates)
})
  .then(response => response.json())
  .then(user => console.log('Utilisateur mis à jour:', user))
  .catch(error => console.error('Erreur:', error));`
    },
    {
      method: 'DELETE',
      path: '/api/users/:id',
      description: 'Supprime un utilisateur',
      code: `// Supprimer un utilisateur
const userId = '123';

fetch(\`https://api.example.com/users/\${userId}\`, {
  method: 'DELETE'
})
  .then(response => {
    if (response.ok) {
      console.log('Utilisateur supprimé avec succès');
    } else {
      throw new Error('Erreur lors de la suppression');
    }
  })
  .catch(error => console.error('Erreur:', error));`
    }
  ];

  const getMethodColor = (method: string) => {
    const colors = {
      GET: 'bg-green-500',
      POST: 'bg-blue-500',
      PUT: 'bg-yellow-500',
      DELETE: 'bg-red-500'
    };
    return colors[method as keyof typeof colors];
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'GET':
        return <FileSearch className="w-6 h-6" />;
      case 'POST':
        return <Plus className="w-6 h-6" />;
      case 'PUT':
        return <Pencil className="w-6 h-6" />;
      case 'DELETE':
        return <Trash2 className="w-6 h-6" />;
      default:
        return <Send className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-white">
          Les Endpoints API en JavaScript
        </h1>

        {/* Endpoints Flow */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-4 md:p-8 mb-8 border border-gray-700">
          <div className="grid grid-cols-1 md:flex md:items-center md:justify-between gap-6 md:gap-0 relative">
            {endpoints.map((endpoint, index) => (
              <React.Fragment key={index}>
                {/* Endpoint Node */}
                <div 
                  className={`flex flex-col items-center cursor-pointer transition-all
                    ${selectedEndpoint === index ? 'transform scale-110' : 'opacity-70'}
                  `}
                  onClick={() => setSelectedEndpoint(index)}
                >
                  <div className={`p-4 rounded-xl ${getMethodColor(endpoint.method)} 
                    ${selectedEndpoint === index ? 'ring-4 ring-white ring-opacity-20' : ''}
                    transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105`}
                  >
                    {getMethodIcon(endpoint.method)}
                  </div>
                  <div className="mt-4 text-center">
                    <p className="font-mono text-sm text-white mb-2">{endpoint.method}</p>
                    <p className="font-mono text-xs text-gray-400">{endpoint.path}</p>
                  </div>
                </div>

                {/* Connector - Hidden on mobile */}
                {index < endpoints.length - 1 && (
                  <div className="hidden md:flex flex-1 items-center justify-center">
                    <ArrowRight className={`w-6 h-6 text-gray-600 ${
                      selectedEndpoint === index ? 'text-white animate-pulse' : ''
                    }`} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Description Panel */}
          <div className="mt-8 md:mt-12 p-4 md:p-6 bg-gray-900 rounded-xl border border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  {endpoints[selectedEndpoint].method} {endpoints[selectedEndpoint].path}
                </h3>
                <p className="text-gray-400">
                  {endpoints[selectedEndpoint].description}
                </p>
              </div>
              <button
                onClick={() => setShowCode(!showCode)}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                {showCode ? 'Masquer le code' : 'Voir le code'}
              </button>
            </div>

            {/* Code Example with Prism.js Syntax Highlighting */}
            {showCode && (
              <pre className="bg-gray-950 p-4 md:p-6 rounded-lg overflow-x-auto">
                <code className="language-javascript">
                  {endpoints[selectedEndpoint].code}
                </code>
              </pre>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setSelectedEndpoint(prev => Math.max(0, prev - 1))}
            disabled={selectedEndpoint === 0}
            className="flex-1 md:flex-none px-4 md:px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Précédent
          </button>
          <button
            onClick={() => setSelectedEndpoint(prev => Math.min(endpoints.length - 1, prev + 1))}
            disabled={selectedEndpoint === endpoints.length - 1}
            className="flex-1 md:flex-none px-4 md:px-6 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;